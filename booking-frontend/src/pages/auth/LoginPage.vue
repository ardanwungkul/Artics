<script setup>
import { computed, ref } from 'vue'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import { Password } from 'primevue'
import { useAuthStore } from '@/stores/auth'
import ValidationErrors from '@/components/ValidationErrors.vue'

const authStore = useAuthStore()
const form = ref({
  email: 'admin@gmail.com',
  password: '12345678',
})
const setErrors = ref([])
const errors = computed(() => setErrors.value)
const processing = ref(false)
const Login = async () => {
  await authStore.login(form, setErrors, processing)
}
</script>

<template>
  <ValidationErrors class="w-full" :errors="errors" />
  <AuthLayout>
    <div>
      <div class="flex gap-2 items-center justify-center">
        <p class="text-center text-white whitespace-nowrap">Login to</p>
        <router-link :to="{ name: 'welcomePage' }">
          <p class="text-secondary-500 text-xl font-medium font-comic">Artics.</p>
        </router-link>
      </div>
      <form @submit.prevent="Login">
        <div class="space-y-5 py-3">
          <div>
            <input
              type="text"
              class="w-full text-sm bg-primary-600 rounded-4xl text-white px-4 py-3 shadow shadow-secondary-500/15"
              v-model="form.email"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <Password
              v-model="form.password"
              size="small"
              class="w-full text-sm bg-primary-600 rounded-4xl px-4 py-3 shadow shadow-secondary-500/15"
              :feedback="false"
              inputClass="!bg-primary-600 !border-none !p-0 !text-white"
              toggleMask
              required
              placeholder="Password"
            />
          </div>
          <button
            :disabled="processing"
            type="submit"
            class="bg-secondary-500 w-full rounded-4xl px-4 h-[44px] text-primary-700 font-semibold cursor-pointer text-sm hover:opacity-90 shadow"
          >
            Login to Your Account
          </button>
        </div>
        <div class="flex items-center mb-3 text-xs gap-3 justify-center">
          <p class="text-primary-100">Dont Have Account?</p>
          <router-link :to="{ name: 'registerPage' }" class="text-white hover:underline"
            >Register Now</router-link
          >
        </div>
      </form>
    </div>
  </AuthLayout>
</template>
<style scoped>
.p-password {
  width: 100%;
}
</style>
