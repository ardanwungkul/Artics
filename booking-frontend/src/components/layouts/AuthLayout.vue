<script setup>
import AnimationLogin from '@/assets/lottie/AnimationLogin.json';
import BackgroundAuth from '@/components/BackgoundAuth.vue';
</script>
<template>
    <div class="bg-primary-600">
        <div class="min-h-screen w-full p-5 flex items-center justify-center relative bg-primary-600">
            <BackgroundAuth />
            <div
                class="w-full max-w-3xl rounded-4xl px-10 py-5 shadow-lg bg-primary-500/5 backdrop-blur-[5px] gap-3 border border-secondary-500 relative"
            >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div class="w-full hidden md:flex justify-center items-center pr-5">
                        <Vue3Lottie :animationData="AnimationLogin" class="w-full" />
                    </div>
                    <div class="md:flex-none flex-auto w-full py-3">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
