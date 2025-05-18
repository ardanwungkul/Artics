<script setup>
import { Button, Dialog, Toast } from 'primevue'
import { computed, ref, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useBookingStore } from '@/stores/booking'
import { useAuthStore } from '@/stores/auth'
import ValidationErrors from './ValidationErrors.vue'

const authStore = useAuthStore()

const toast = useToast()
const bookingStore = useBookingStore()
const props = defineProps({
  item: Object,
})
const setErrors = ref([])
const errors = computed(() => setErrors.value)
const processing = ref(false)
const today = new Date().toISOString().split('T')[0]

const form = ref({
  user_id: authStore.decryptedUserData.id,
  room_id: props.item.id,
  date: today,
  start_time: null,
  end_time: null,
  capacity: null,
})
const visible = ref(false)
watch(
  () => [form.value.start_time, form.value.end_time],
  ([start, end]) => {
    if (start && end && start >= end) {
      toast.add({
        severity: 'warn',
        summary: 'Invalid Time',
        detail: 'Start time must be before end time',
        life: 3000,
      })
      form.value.end_time = null
    }
  },
)
const submit = async () => {
  try {
    await bookingStore.store(form, setErrors, processing)
    toast.add({
      severity: 'success',
      summary: 'Successfully Booking Rooms',
      life: 3000,
    })

    visible.value = false
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Failed to book room',
      detail: error?.response?.data?.message || 'Unknown error occurred',
      life: 3000,
    })
  }
}
</script>
<template>
  <ValidationErrors class="w-full" :errors="errors" />

  <Toast />
  <button
    @click="visible = true"
    class="bg-primary-600 rounded-lg p-5 shadow shadow-primary-400 hover:opacity-90 cursor-pointer w-full"
  >
    <p class="text-center text-white text-lg">{{ item?.name }} - {{ item?.location }}</p>
    <p class="text-center text-primary-200 text-sm">Capacity {{ item?.capacity }} Person</p>
  </button>
  <Dialog v-model:visible="visible" modal :header="`Booking  ${item?.name}`" class="w-xl">
    <form @submit.prevent="submit">
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-2">
          <label class="mb-1 block" for="date">Date</label>
          <input
            type="date"
            id="date"
            :min="today"
            class="w-full rounded-lg p-2.5 text-sm border"
            v-model="form.date"
            required
          />
        </div>
        <div>
          <label class="mb-1 block" for="start_time">Start Time</label>
          <input
            type="time"
            id="start_time"
            class="w-full rounded-lg p-2.5 text-sm border"
            v-model="form.start_time"
            required
          />
        </div>
        <div>
          <label class="mb-1 block" for="end_time">End Time</label>
          <input
            type="time"
            id="end_time"
            class="w-full rounded-lg p-2.5 text-sm border"
            v-model="form.end_time"
            required
          />
        </div>
        <div class="col-span-2">
          <label class="mb-1 block" for="capacity">Capacity</label>
          <input
            type="integer"
            id="capacity"
            class="w-full rounded-lg p-2.5 text-sm border"
            placeholder="Capacity"
            v-model="form.capacity"
            required
          />
        </div>
        <div class="flex justify-end gap-2 col-span-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="visible = false"
          ></Button>
          <Button type="submit" label="Save"></Button>
        </div>
      </div>
    </form>
  </Dialog>
</template>
