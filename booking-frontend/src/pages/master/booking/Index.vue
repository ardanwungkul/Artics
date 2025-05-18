<script setup>
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted, ref, watchEffect } from 'vue'
import Add from '@/pages/master/room/Add.vue'
import { Button } from 'primevue'
import { useBookingStore } from '@/stores/booking'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

dayjs.locale('id')
const now = dayjs()

const bookingStore = useBookingStore()
const datas = ref([])

onMounted(async () => {
  await bookingStore.getAllData()
  datas.value = bookingStore.datas
})

const isUpcoming = (data) => {
  const start = dayjs(`${data.date} ${data.start_time}`, 'YYYY-MM-DD HH:mm')
  return data.status !== 'cancelled' && now.isBefore(start)
}

const cancel = async (id) => {
  await bookingStore.cancel(id)
}

watchEffect(() => {
  datas.value = bookingStore.datas
})
</script>
<template>
  <AuthenticatedLayout>
    <div class="bg-primary-600 p-5 rounded-xl space-y-3">
      <DataTable
        :value="datas"
        stripedRows
        responsiveLayout="scroll"
        emptyMessage="Empty Data."
        :pt:root:class="'!rounded-xl !overflow-hidden !bg-primary-600 text-sm '"
      >
        <Column field="user.name" header="Name" />
        <Column header="Room">
          <template #body="{ data }">
            <p>{{ data.room.location }} - {{ data.room.name }}</p>
          </template>
        </Column>
        <Column header="Date">
          <template #body="{ data }">
            <p>{{ dayjs(data?.date).format('D MMMM YYYY') }}</p>
          </template>
        </Column>
        <Column header="Time">
          <template #body="{ data }">
            <div class="flex justify-between gap-1 w-32">
              <p>{{ data?.start_time }}</p>
              <p>-</p>
              <p>{{ data?.end_time }}</p>
            </div>
          </template>
        </Column>
        <Column header="Status">
          <template #body="{ data }">
            <p
              v-if="data.status == 'booked'"
              class="border-green-500 text-green-500 capitalize border text-center rounded-lg"
            >
              {{ data.status }}
            </p>
            <p v-else class="border-red-500 text-red-500 capitalize border text-center rounded-lg">
              {{ data.status }}
            </p>
          </template>
        </Column>
        <Column header="Action">
          <template #body="{ data }">
            <div>
              <button
                v-if="isUpcoming(data)"
                class="flex items-center gap-1 hover:text-red-500 cursor-pointer"
                @click="cancel(data.id)"
              >
                <i class="pi pi-ban"></i>
                <p class="text-sm">Cancel</p>
              </button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </AuthenticatedLayout>
</template>
