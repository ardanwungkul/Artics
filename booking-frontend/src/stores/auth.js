import { defineStore, acceptHMRUpdate } from 'pinia'
import { useStorage } from '@vueuse/core'
import api from '@/config/axios.js'
import router from '@/router'
import { useUIStore } from '@/stores/ui'
import CryptoJS, { enc } from 'crypto-js'

const key = import.meta.env.VITE_CRYPTO_KEY

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoading: false,
    user: [],
    userData: [],
    encryptedUserData: useStorage('userData', null),
    token: useStorage('jwt_token'),
  }),
  getters: {
    authStatus: (state) => !!state.token,
    decryptedUserData(state) {
      if (!state.encryptedUserData) return null
      try {
        const bytes = CryptoJS.AES.decrypt(state.encryptedUserData, key)
        const decryptedStr = bytes.toString(CryptoJS.enc.Utf8)
        return JSON.parse(decryptedStr)
      } catch (e) {
        console.error('Decryption error:', e)
        return null
      }
    },
  },
  actions: {
    async getUserData() {
      const uiStore = useUIStore()
      uiStore.isLoading = true
      try {
        const response = await api.get('/user')
        this.user = response.data.user
      } catch (error) {
        console.log(error)
      } finally {
        uiStore.isLoading = false
      }
    },
    async login(form, setErrors, processing) {
      const uiStore = useUIStore()
      processing.value = true
      uiStore.isLoading = true
      try {
        const response = await api.post('/login', form.value)

        const fullUserObject = response.data.user
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(fullUserObject), key).toString()

        this.encryptedUserData = encrypted
        this.token = response.data.token
        if (response.data.user.role == 'admin') {
          router.push({ name: 'dashboardPage' })
        } else {
          router.push({ name: 'dashboardUser' })
        }
      } catch (error) {
        console.log(error)
        if (error.response && error.response.status !== 422) throw error
        setErrors.value = Object.values(error.response.data.errors || {}).flat()
      } finally {
        processing.value = false
        uiStore.isLoading = false
      }
    },
    async register(form, setErrors, processing) {
      const uiStore = useUIStore()
      processing.value = true
      uiStore.isLoading = true
      try {
        const response = await api.post('/register', form.value)
        const fullUserObject = response.data.user
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(fullUserObject), key).toString()
        console.log(encrypted)

        this.encryptedUserData = encrypted
        this.token = response.data.token

        if (response.data.user.role == 'admin') {
          router.push({ name: 'dashboardPage' })
        } else {
          router.push({ name: 'dashboardUser' })
        }
      } catch (error) {
        console.log(error)
        if (error.response && error.response.status !== 422) throw error
        setErrors.value = Object.values(error.response.data.errors || {}).flat()
      } finally {
        processing.value = false
        uiStore.isLoading = false
      }
    },
    async logout() {
      this.encryptedUserData = null
      this.token = null

      router.push({ name: 'loginPage' })
    },
  },
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
