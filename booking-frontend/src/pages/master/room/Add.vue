<script setup>
import { useRoomStore } from '@/stores/room'
import { Button, Dialog, InputNumber, InputText } from 'primevue'
import { computed, ref } from 'vue'
import ValidationErrors from '@/components/ValidationErrors.vue'

const emit = defineEmits(['close', 'saved'])
const roomStore = useRoomStore()
const setErrors = ref([])
const errors = computed(() => setErrors.value)
const processing = ref(false)
const form = ref({
  name: null,
  location: null,
  capacity: null,
})

const store = async () => {
  try {
    await roomStore.store(form, setErrors, processing)
    emit('saved')
    emit('close')
    form.value = { name: null, location: null, capacity: null }
    visible.value = false
  } catch (err) {
    console.error(err)
  }
}

const visible = ref(false)
</script>
<template>
  <ValidationErrors class="w-full" :errors="errors" />

  <button
    @click="visible = true"
    class="bg-secondary-600 text-white rounded-xl px-3 py-2 text-sm cursor-pointer"
  >
    Add Rooms
  </button>
  <Dialog v-model:visible="visible" modal header="Add Rooms" :style="{ width: '25rem' }">
    <form @submit.prevent="store">
      <div class="flex items-center gap-4 mb-4">
        <label for="name" class="font-semibold w-24">Name</label>
        <InputText id="name" class="flex-auto" v-model="form.name" required="" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="location" class="font-semibold w-24">Location</label>
        <InputText id="location" class="flex-auto" v-model="form.location" required="" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="capacity" class="font-semibold w-24">Capacity</label>
        <InputNumber id="capacity" class="flex-auto" v-model="form.capacity" required="" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button type="submit" label="Save"></Button>
      </div>
    </form>
  </Dialog>
</template>
