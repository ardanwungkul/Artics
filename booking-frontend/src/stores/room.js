import { defineStore, acceptHMRUpdate } from 'pinia'
import api from '@/config/axios.js'
import router from '@/router'
import { useUIStore } from '@/stores/ui'
import CryptoJS from 'crypto-js'

export const useRoomStore = defineStore('room', {
  state: () => ({
    isLoading: false,
    datas: [],
    data: {},
  }),
  actions: {
    async getAllData() {
      const uiStore = useUIStore()
      uiStore.isLoading = true
      try {
        const response = await api.get('/room')
        this.datas = response.data.data
      } catch (error) {
        console.log(error)
      } finally {
        uiStore.isLoading = false
      }
    },
    async store(form, setErrors, processing) {
      const uiStore = useUIStore()
      processing.value = true
      uiStore.isLoading = true
      try {
        const response = await api.post('/room', form.value)
        this.datas.push(response.data.data)
      } catch (error) {
        console.log(error)
        if (error.response && error.response.status !== 422) throw error
        setErrors.value = Object.values(error.response.data.errors || {}).flat()
      } finally {
        processing.value = false
        uiStore.isLoading = false
      }
    },
    async destroy(id) {
      try {
        await api.delete(`/room/${id}`)
        this.datas = this.datas.filter((room) => room.id !== id)
      } catch (err) {
        console.error('Failed to delete room:', err)
        throw err
      }
    },
  },
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRoomStore, import.meta.hot))
}
