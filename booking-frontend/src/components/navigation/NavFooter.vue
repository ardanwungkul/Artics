<script setup></script>
<template>
  <div class="py-10 px-3 border-t border-primary-400">
    <div class="flex flex-col gap-2 max-w-2xl mx-auto">
      <p class="text-white text-center font-comic">Want to Sign Up Our Newsletter?</p>
      <p class="text-white text-center font-comic">
        Get the latest updates, tips, and exclusive offers straight to your inbox.
      </p>
      <form action="" class="py-2">
        <div class="flex justify-center items-center gap-3">
          <input
            type="text"
            class="rounded-lg bg-primary-800 text-white px-2.5 py-2 text-xs w-full font-comic shadow shadow-primary-400"
            placeholder="Email Address"
            required
          />
          <button
            type="submit"
            class="px-5 py-2 bg-secondary-500 rounded-lg text-xs cursor-pointer font-comic shadow-md shadow-primary-400"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="border-t w-full max-w-6xl mx-auto border-primary-400"></div>
  <div class="py-10 px-3">
    <div class="grid md:grid-cols-4 gap-y-4 gap-2 max-w-6xl mx-auto">
      <div>
        <router-link :to="{ name: 'welcomePage' }">
          <p class="text-secondary-500 text-2xl font-comic font-bold">Artics.</p>
        </router-link>
      </div>
      <div class="font-comic">
        <p class="text-lg text-primary-200 mb-3">Navigation</p>
        <div class="space-y-2">
          <router-link class="text-primary-100 block hover:text-white transition duration-300"
            >Home</router-link
          >
          <router-link class="text-primary-100 block hover:text-white transition duration-300"
            >Aplikasi</router-link
          >
          <router-link class="text-primary-100 block hover:text-white transition duration-300"
            >Layanan</router-link
          >
          <router-link class="text-primary-100 block hover:text-white transition duration-300"
            >Harga</router-link
          >
          <router-link class="text-primary-100 block hover:text-white transition duration-300"
            >Tentang Kami</router-link
          >
        </div>
      </div>
      <div class="font-comic">
        <p class="text-lg text-primary-200 mb-3">Useful Link</p>
        <div class="space-y-2">
          <router-link class="text-primary-100 block hover:text-white transition duration-300"
            >Privacy Policy</router-link
          >
          <router-link class="text-primary-100 block hover:text-white transition duration-300"
            >Terms and Conditions</router-link
          >
          <router-link class="text-primary-100 block hover:text-white transition duration-300"
            >Disclaimer</router-link
          >
          <router-link class="text-primary-100 block hover:text-white transition duration-300"
            >Support</router-link
          >
          <router-link class="text-primary-100 block hover:text-white transition duration-300"
            >FAQ</router-link
          >
        </div>
      </div>
      <div class="font-comic">
        <p class="text-lg text-primary-200 mb-3">Follow Us</p>
        <div class="flex justify-start items-center gap-5">
          <router-link class="text-primary-100 block hover:text-white transition duration-300">
            <i class="pi pi-instagram"></i>
          </router-link>
          <router-link class="text-primary-100 block hover:text-white transition duration-300">
            <i class="pi pi-youtube"></i>
          </router-link>
          <router-link class="text-primary-100 block hover:text-white transition duration-300">
            <i class="pi pi-twitter"></i>
          </router-link>
          <router-link class="text-primary-100 block hover:text-white transition duration-300">
            <i class="pi pi-facebook"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
