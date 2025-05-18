<script setup>
import NavBar from '@/components/navigation/NavBar.vue';
import Footer from '@/components/navigation/NavFooter.vue';
</script>
<template>
    <div class="bg-primary-600 min-h-screen w-full font-poppins text-sm invisible-scrollbar">
        <NavBar />
        <div class="min-h-screen pt-16 invisible-scrollbar">
            <slot />
        </div>
        <Footer />
    </div>
</template>
