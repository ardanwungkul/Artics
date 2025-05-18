<script setup>
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout.vue'
import { useRoomStore } from '@/stores/room'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import BookingDialog from '@/components/BookingDialog.vue'
import { useBookingStore } from '@/stores/booking'
import { useAuthStore } from '@/stores/auth'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

dayjs.locale('id')

const now = dayjs()
const roomStore = useRoomStore()
const rooms = ref([])

const bookingStore = useBookingStore()
const booking = ref([])
const bookings = computed(() =>
  bookingStore.datas.map((b) => ({
    ...b,
    start: dayjs(`${b.date} ${b.start_time}`, 'YYYY-MM-DD HH:mm'),
    end: dayjs(`${b.date} ${b.end_time}`, 'YYYY-MM-DD HH:mm'),
  })),
)

const upcoming = computed(() =>
  bookings.value
    .filter((b) => b.status !== 'cancelled' && now.isBefore(b.start))
    .sort((a, b) => a.start.diff(b.start)),
)

const beingMeeting = computed(() =>
  bookings.value
    .filter((b) => b.status !== 'cancelled' && now.isAfter(b.start) && now.isBefore(b.end))
    .sort((a, b) => a.start.diff(b.start)),
)

const finish = computed(() =>
  bookings.value
    .filter((b) => b.status !== 'cancelled' && now.isAfter(b.end))
    .sort((a, b) => a.start.diff(b.start)),
)

const canceled = computed(() =>
  bookings.value.filter((b) => b.status === 'cancelled').sort((a, b) => a.start.diff(b.start)),
)

const authStore = useAuthStore()
onMounted(async () => {
  await roomStore.getAllData()
  await bookingStore.getDataByUserId(authStore.decryptedUserData?.id)

  booking.value = bookingStore.datas
  rooms.value = roomStore.datas
})

const cancel = async (id) => {
  await bookingStore.cancel(id)
}

watchEffect(() => {
  booking.value = bookingStore.datas
})
</script>
<template>
  <AuthenticatedLayout>
    <div class="flex flex-col gap-10 min-h-screen">
      <div class="space-y-4">
        <p class="text-xl text-white">Booking Rooms</p>
        <div class="grid grid-cols-4 gap-4">
          <div v-for="(item, index) in rooms" :key="index">
            <BookingDialog :item="item" />
          </div>
        </div>
      </div>

      <div
        v-if="booking.length > 0"
        class="bg-primary-600 w-full p-5 rounded-xl shadow shadow-primary-400 space-y-5"
      >
        <p class="text-xl text-white mb-5">Booked Rooms</p>
        <div v-if="beingMeeting.length > 0">
          <p class="text-lg text-yellow-400 mb-1">Being Meeting</p>
          <ul class="space-y-3">
            <li
              v-for="(item, i) in beingMeeting"
              :key="'now' + i"
              class="w-full bg-primary-500 rounded-lg p-3 shadow shadow-primary-300 text-white"
            >
              <p>
                {{ item?.room?.name }}
              </p>
              <p class="text-primary-200 text-xs">
                {{ dayjs(item?.date).format('D MMMM YYYY') }}
                (
                {{ item?.start_time }} -
                {{ item?.end_time }}
                )
              </p>
            </li>
          </ul>
        </div>

        <div v-if="upcoming.length > 0">
          <p class="text-lg text-green-400 mb-1">Upcoming</p>
          <ul class="space-y-3">
            <li
              v-for="(item, i) in upcoming"
              :key="'upcoming' + i"
              class="w-full bg-primary-500 rounded-lg p-3 shadow shadow-primary-300 text-white"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p>
                    {{ item?.room?.name }}
                  </p>
                  <p class="text-primary-200 text-xs">
                    {{ dayjs(item?.date).format('D MMMM YYYY') }}
                    (
                    {{ item?.start_time }} -
                    {{ item?.end_time }}
                    )
                  </p>
                </div>
                <div>
                  <button
                    class="flex items-center gap-1 hover:text-red-500 cursor-pointer"
                    @click="cancel(item.id)"
                  >
                    <i class="pi pi-ban"></i>
                    <p class="text-sm">Cancel</p>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div v-if="finish.length > 0">
          <p class="text-lg text-red-400 mb-1">Done</p>
          <ul class="space-y-3">
            <li
              v-for="(item, i) in finish"
              :key="'finish' + i"
              class="w-full bg-primary-500 rounded-lg p-3 shadow shadow-primary-300 text-white"
            >
              <p>
                {{ item?.room?.name }}
              </p>
              <p class="text-primary-200 text-xs">
                {{ dayjs(item?.date).format('D MMMM YYYY') }}
                (
                {{ item?.start_time }} -
                {{ item?.end_time }}
                )
              </p>
            </li>
          </ul>
        </div>

        <div v-if="canceled.length > 0">
          <p class="text-lg text-red-400 mb-1">Canceled</p>
          <ul class="space-y-3">
            <li
              v-for="(item, i) in canceled"
              :key="'finish' + i"
              class="w-full bg-primary-500 rounded-lg p-3 shadow shadow-primary-300 text-white"
            >
              <p>
                {{ item?.room?.name }}
              </p>
              <p class="text-primary-200 text-xs">
                {{ dayjs(item?.date).format('D MMMM YYYY') }}
                (
                {{ item?.start_time }} -
                {{ item?.end_time }}
                )
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
