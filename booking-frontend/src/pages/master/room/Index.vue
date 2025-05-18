<script setup>
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout.vue'
import { useRoomStore } from '@/stores/room'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted, ref, watchEffect } from 'vue'
import Add from '@/pages/master/room/Add.vue'
import { Button } from 'primevue'

const roomStore = useRoomStore()
const datas = ref([])

onMounted(async () => {
  await roomStore.getAllData()
  datas.value = roomStore.datas
})

const destroy = async (id) => {
  roomStore.destroy(id)
}
watchEffect(() => {
  datas.value = roomStore.datas
})
</script>
<template>
  <AuthenticatedLayout>
    <div class="bg-primary-600 p-5 rounded-xl space-y-3">
      <div>
        <Add @close="showForm = false" @saved="handleSaved" />
      </div>
      <DataTable
        :value="datas"
        stripedRows
        responsiveLayout="scroll"
        emptyMessage="Empty Data."
        :pt:root:class="'!rounded-xl !overflow-hidden !bg-primary-600 text-sm '"
      >
        <Column field="name" header="Name" />
        <Column field="location" header="Location" />
        <Column field="capacity" header="Capacity" />
        <Column header="Action">
          <template #body="{ data }">
            <Button
              icon="pi pi-trash"
              class="p-button-text p-button-sm text-red-500"
              @click="destroy(data.id)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </AuthenticatedLayout>
</template>
