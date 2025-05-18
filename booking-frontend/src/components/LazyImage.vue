<script setup>
import { Skeleton } from 'primevue';
import { defineProps, ref } from 'vue';
const props = defineProps({
    src: String
});
const loaded = ref(false);
</script>
<template>
    <div class="relative w-14 h-14">
        <Skeleton
            v-if="!loaded"
            width="3.5rem"
            height="3.5rem"
            borderRadius="16px"
            :pt="{
                root: {
                    class: '!bg-primary-400 !absolute !top-0 !left-0'
                }
            }"
        />
        <img
            v-if="src !== null"
            :src="props.src"
            alt="Image"
            @load="loaded = true"
            class="!w-14 !h-14 !object-cover"
            style="position: absolute; top: 0; left: 0"
        />
    </div>
</template>
