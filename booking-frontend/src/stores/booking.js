import { defineStore, acceptHMRUpdate } from 'pinia'
import api from '@/config/axios.js'
import router from '@/router'
import { useUIStore } from '@/stores/ui'
import CryptoJS from 'crypto-js'

export const useBookingStore = defineStore('booking', {
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
        const response = await api.get('/booking')
        this.datas = response.data.data
      } catch (error) {
        console.log(error)
      } finally {
        uiStore.isLoading = false
      }
    },
    async getDataByUserId(id) {
      const uiStore = useUIStore()
      uiStore.isLoading = true
      try {
        const response = await api.get(`/booking-by-user-id/${id}`)
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
        const response = await api.post('/booking', form.value)
        this.datas.push(response.data.data)
      } catch (error) {
        if (error.response && error.response.status !== 422) throw error
        setErrors.value = Object.values(error.response.data.errors || {}).flat()
        throw error
      } finally {
        processing.value = false
        uiStore.isLoading = false
      }
    },
    async cancel(id) {
      try {
        await api.post(`/booking-cancel/${id}`)
        const item = this.datas.find((item) => item.id === id)
        if (item) {
          item.status = 'cancelled'
        }
      } catch (err) {
        console.error('Failed to delete room:', err)
        throw err
      }
    },
  },
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBookingStore, import.meta.hot))
}
