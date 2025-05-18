<template>
  <div>
    <ProgressBar :isLoading="ui.isLoading" :mode="'indeterminate'" :value="ui.loadingValue" />
    <router-view />
  </div>
</template>

<script setup>
import { useUIStore } from '@/stores/ui'
const ui = useUIStore()
import ProgressBar from '@/components/ProgressBar.vue'
</script>
