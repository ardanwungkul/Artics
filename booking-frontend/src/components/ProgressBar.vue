<script setup>
import ProgressBar from 'primevue/progressbar';
import { computed, defineProps } from 'vue';

const props = defineProps({
    isLoading: Boolean,
    autoRoute: Boolean,
    mode: {
        type: String,
        default: 'indeterminate'
    },
    value: {
        type: Number,
        default: 0
    }
});
const visible = computed(() => props.isLoading || props.autoRoute);
</script>
<template>
    <ProgressBar
        :mode="mode"
        style="height: 2px"
        :value="mode == 'indeterminate' ? null : value"
        class="!fixed top-0 w-full left-0 z-[999999999] progress-bar"
        v-if="visible"
    />
</template>
