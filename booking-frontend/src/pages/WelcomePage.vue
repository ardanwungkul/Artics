<script setup>
import GuestLayout from '@/components/layouts/GuestLayout.vue'
</script>
<template>
  <GuestLayout>
    <div class="h-screen relative flex items-center justify-center -mt-16">
      <div class="absolute bottom-0 left-0 w-full h-[100px] z-0 bg-jar">
        <div class=""></div>
      </div>
      <div class="flex items-center justify-center gap-5 flex-col relative z-10">
        <p class="text-white text-center font-comic text-5xl max-w-4xl mx-auto tracking-widest">
          Welcome To
          <span class="text-secondary-500 font-bold">Artics</span>
          Booking Apps
        </p>
        <router-link
          :to="{
            name: 'dashboardPage',
          }"
          class="mx-auto bg-secondary-500 hover:opacity-80 transition-all duration-500 rounded-xl px-5 py-2 text-primary-700 font-comic text-lg font-bold tracking-widest uppercase hover:-translate-y-2 hover:shadow-lg hover:shadow-primary-300 font-poppins"
          >Get Started</router-link
        >
      </div>
    </div>
    <div class="h-screen bg-primary-400"></div>
  </GuestLayout>
</template>
