<script setup>
import { ref } from 'vue'
import { Drawer, Popover } from 'primevue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const expanded = ref(false)
const dropdownUser = ref()
const mobileSidebar = ref(false)
const toggleDropdownUser = (event) => {
  dropdownUser.value.toggle(event)
}

function Logout() {
  authStore.logout()
}

const itemSidebar = ref([])
if (authStore.decryptedUserData?.role == 'admin') {
  itemSidebar.value = [
    {
      icon: 'pi-th-large',
      to: 'dashboardPage',
      title: 'Dashboard',
    },
    {
      icon: 'pi-warehouse',
      to: 'room.index',
      title: 'Rooms',
    },
    {
      icon: 'pi-book',
      to: 'booking.index',
      title: 'Bookings',
    },
  ]
} else {
  itemSidebar.value = [
    {
      icon: 'pi-th-large',
      to: 'dashboardUser',
      title: 'Dashboard',
    },
  ]
}
</script>
<template>
  <div class="bg-primary-600 h-screen w-full font-poppins">
    <!-- Sidebar -->
    <Drawer
      v-model:visible="mobileSidebar"
      header="Artics"
      :pt:root:class="'!bg-primary-600 md:!hidden'"
    >
      <div class="h-full overflow-y-scroll invisible-scrollbar px-3 py-3 space-y-2">
        <div v-for="(item, index) in itemSidebar" :key="index" class="w-full">
          <router-link
            :to="{ name: item.to }"
            class="w-full items-center flex !text-white transition-none justify-start pl-[13px] gap-2 hover:bg-primary-400 rounded-lg py-2"
          >
            <i class="pi !text-lg" :class="item.icon"></i>
            <p class="text-sm">{{ item.title }}</p>
          </router-link>
        </div>
      </div>
    </Drawer>
    <div
      class="fixed bg-primary-600 h-screen transition-all duration-300 z-40 hidden md:block"
      @mouseenter="expanded = true"
      @mouseleave="expanded = false"
      :class="expanded ? 'w-64' : 'w-[70px]'"
    >
      <div class="px-3 py-3 flex items-center gap-2">
        <div
          class="aspect-square object-contain flex-none relative z-10 border border-secondary-500 rounded-lg flex items-center justify-center w-[46px]"
        >
          <i class="pi pi-bars text-lg text-white"></i>
        </div>
        <p
          class="text-secondary-500 text-xl font-medium font-comic transition-all duration-300 relative"
          :class="expanded ? 'opacity-100' : ' opacity-0 -translate-y-80'"
        >
          Artics
        </p>
      </div>
      <div class="border-t border-primary-400 mx-3"></div>
      <div class="h-full overflow-y-scroll invisible-scrollbar px-3 py-3 space-y-2">
        <div v-for="(item, index) in itemSidebar" :key="index" class="w-full">
          <router-link
            :to="{ name: item.to }"
            class="w-full items-center flex text-white transition-none justify-start pl-[13px] gap-2 hover:bg-primary-400 rounded-lg py-2"
          >
            <i class="pi !text-lg" :class="item.icon"></i>
            <p class="text-sm" :class="!expanded ? 'hidden' : ''">{{ item.title }}</p>
          </router-link>
        </div>
      </div>
    </div>
    <div class="md:pl-[70px] relative h-screen invisible-scrollbar">
      <!-- Overlay -->
      <div
        class="fixed w-full h-screen bg-black/30 z-30 invisible-scrollbar"
        :class="expanded ? 'block' : 'hidden'"
      ></div>

      <!-- Header -->
      <div class="h-[70px] w-full fixed top-0 left-0 md:pl-[70px]">
        <div class="flex justify-between md:justify-end items-center py-3 px-5 h-full">
          <button
            class="pi pi-bars text-white cursor-pointer block md:!hidden"
            @click="mobileSidebar = true"
          ></button>
          <div>
            <button @click="toggleDropdownUser" class="cursor-pointer flex gap-2 items-center">
              <img
                class="rounded-full w-10"
                src="https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small_2x/default-avatar-photo-placeholder-profile-picture-vector.jpg"
                alt=""
              />
              <div>
                <p class="text-white font-medium truncate w-40 text-sm text-start">
                  {{ authStore?.decryptedUserData?.name }}
                </p>
                <p class="text-primary-200 truncate w-40 text-xs text-start">
                  {{ authStore?.decryptedUserData?.email }}
                </p>
              </div>
              <div>
                <i class="pi pi-angle-down text-primary-200"></i>
              </div>
            </button>

            <Popover
              ref="dropdownUser"
              :pt="{
                root: {
                  class: '!bg-primary-600 ',
                },
              }"
            >
              <div class="flex flex-col gap-4 w-40">
                <ul>
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

      <!-- Content -->
      <div class="pt-[70px] w-full h-screen">
        <div
          class="w-full h-full bg-primary-800 rounded-tl-4xl border-t border-primary-300 overflow-y-scroll invisible-scrollbar p-7"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
