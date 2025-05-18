<script setup>
import { computed, ref } from 'vue';
import AuthLayout from '@/components/layouts/AuthLayout.vue';
import { Password } from 'primevue';
import { useAuthStore } from '@/stores/auth';
import ValidationErrors from '@/components/ValidationErrors.vue';

const authStore = useAuthStore();
const form = ref({
    name: null,
    email: null,
    password: null
});
const setErrors = ref([]);
const errors = computed(() => setErrors.value);
const processing = ref(false);
const Login = async () => {
    await authStore.register(form, setErrors, processing);
};
</script>

<template>
    <ValidationErrors class="w-full" :errors="errors" />
    <AuthLayout>
        <div>
            <div class="flex gap-2 items-center justify-center">
                <p class="text-center text-white whitespace-nowrap">Login to</p>
                <router-link :to="{ name: 'welcomePage' }">
                    <p class="text-secondary-500 text-xl font-medium font-comic">OneBizSuite</p>
                </router-link>
            </div>
            <form @submit.prevent="Login">
                <div class="space-y-5 py-3">
                    <div>
                        <input
                            type="text"
                            class="w-full text-sm bg-primary-600 rounded-4xl text-white px-4 py-3 shadow shadow-secondary-500/15"
                            v-model="form.name"
                            placeholder="Fullname"
                            required
                        />
                    </div>
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
                        Register Now
                    </button>
                </div>
                <div class="flex items-center mb-3 text-xs gap-3 justify-center">
                    <p class="text-primary-100">Already Have Account?</p>
                    <router-link :to="{ name: 'loginPage' }" class="text-white hover:underline">Login</router-link>
                </div>
                <!-- <fieldset class="border-t border-secondary-500">
                    <legend class="text-xs text-center px-3 text-white">or Sign In with</legend>
                </fieldset>
                <div class="flex items-center justify-center gap-5 mt-2 py-3">
                    <button class="flex items-center justify-center cursor-pointer group">
                        <div class="bg-white rounded-full p-2 group-hover:opacity-90">
                            <svg
                                class="w-7"
                                viewBox="-3 0 262 262"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="xMidYMid"
                                fill="#000000"
                            >
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                        fill="#4285F4"
                                    ></path>
                                    <path
                                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                        fill="#34A853"
                                    ></path>
                                    <path
                                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                                        fill="#FBBC05"
                                    ></path>
                                    <path
                                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                        fill="#EB4335"
                                    ></path>
                                </g>
                            </svg>
                        </div>
                    </button>
                    <button class="flex items-center justify-center cursor-pointer group">
                        <div class="bg-white rounded-full p-2 group-hover:opacity-90">
                            <svg
                                class="w-7"
                                viewBox="38.657999999999994 12.828 207.085 207.085"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                            >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M158.232 219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658 2.96-17.922 18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106 0-47.348 17.155-47.348 48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z"
                                        fill="#3c5a9a"
                                    ></path>
                                </g>
                            </svg>
                        </div>
                    </button>
                    <button class="flex items-center justify-center cursor-pointer group">
                        <div class="bg-white rounded-full p-2 group-hover:opacity-90">
                            <svg
                                viewBox="0 0 20 20"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                class="w-7"
                                fill="#000000"
                            >
                                <g id="SVGRepo_iconCarrier">
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g
                                            id="Dribbble-Light-Preview"
                                            transform="translate(-140.000000, -7559.000000)"
                                            fill="#000000"
                                        >
                                            <g id="icons" transform="translate(56.000000, 160.000000)">
                                                <path
                                                    d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                                                    id="github-[#142]"
                                                ></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </button>
                </div> -->
            </form>
        </div>
    </AuthLayout>
</template>
<style scoped>
.p-password {
    width: 100%;
}
</style>
