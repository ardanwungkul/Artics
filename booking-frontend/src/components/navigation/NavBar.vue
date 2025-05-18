<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted, onUnmounted } from 'vue'
import { Popover } from 'primevue'

const authStore = useAuthStore()
const dropdownUser = ref()
const isScrolled = ref(false)
const userData = ref([])

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0

  if (dropdownUser.value) {
    dropdownUser.value.hide()
  }
}

const toggleDropdownUser = (event) => {
  dropdownUser.value.toggle(event)
}

onMounted(() => {
  userData.value = authStore.decryptedUserData

  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  handleScroll()
})

function Logout() {
  authStore.logout()
}
</script>
<template>
  <div
    class="w-full fixed top-0 left-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'top-7' : 'top-0'"
  >
    <div
      class="w-full flex justify-between items-center px-3 py-3 max-w-6xl mx-auto transition-all duration-300"
      :class="isScrolled ? 'border border-primary-400 rounded-xl bg-primary-500' : 'border-none'"
    >
      <router-link :to="{ name: 'welcomePage' }" class="flex items-center gap-2">
        <p class="text-secondary-500 text-xl font-medium font-comic">Artics</p>
      </router-link>

      <div class="flex items-center gap-1">
        <router-link
          class="text-primary-50 hover:text-secondary-500 font-medium py-2 px-5 transition-colors duration-200 hover:underline"
          :to="{
            name: 'welcomePage',
          }"
          >Home</router-link
        >
      </div>
      <div>
        <router-link
          v-if="authStore.authStatus == false"
          class="text-primary-50 hover:text-secondary-500 font-medium py-2 px-5 transition-colors duration-200 hover:underline"
          :to="{
            name: 'loginPage',
          }"
        >
          Login
        </router-link>
        <div v-else class="relative">
          <button @click="toggleDropdownUser" class="cursor-pointer flex gap-2 items-center">
            <img
              class="rounded-full w-10"
              src="https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small_2x/default-avatar-photo-placeholder-profile-picture-vector.jpg"
              alt=""
            />
          </button>

          <Popover
            ref="dropdownUser"
            :pt="{
              root: {
                class: '!bg-primary-600 !p-0',
              },
            }"
          >
            <div class="space-y-3 w-40 divide-y">
              <div>
                <div
                  class="w-full text-start text-xs flex gap-2 items-start text-white pr-3 pb-2 rounded-lg"
                >
                  <img
                    class="rounded-full w-10"
                    src="https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small_2x/default-avatar-photo-placeholder-profile-picture-vector.jpg"
                    alt=""
                  />
                  <div class="grid grid-cols-1">
                    <p class="text-sm font-medium capitalize truncate" :title="userData.name">
                      {{ userData.name }}
                    </p>
                    <p class="truncate text-primary-200" :title="userData.email">
                      {{ userData.email }}
                    </p>
                  </div>
                </div>
              </div>
              <ul class="space-y-1">
                <li>
                  <router-link
                    v-if="authStore.decryptedUserData.role == 'admin'"
                    :to="{ name: 'dashboardPage' }"
                    class="cursor-pointer w-full text-start text-sm flex items-center gap-2 text-white hover:bg-primary-400 px-3 py-2 rounded-lg transition-all duration-300"
                  >
                    <i class="pi pi-th-large"></i>
                    <p class="">Dashboard</p>
                  </router-link>
                  <router-link
                    v-else
                    :to="{ name: 'dashboardUser' }"
                    class="cursor-pointer w-full text-start text-sm flex items-center gap-2 text-white hover:bg-primary-400 px-3 py-2 rounded-lg transition-all duration-300"
                  >
                    <i class="pi pi-th-large"></i>
                    <p class="">Dashboard</p>
                  </router-link>
                </li>
                <li>
                  <button
                    @click="Logout"
                    class="cursor-pointer w-full text-start text-sm flex items-center gap-2 text-white hover:bg-primary-400 px-3 py-2 rounded-lg transition-all duration-300"
                  >
                    <i class="pi pi-sign-out"></i>
                    <p class="">Sign Out</p>
                  </button>
                </li>
              </ul>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  </div>
</template>
