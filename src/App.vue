<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Global Header with Session Selector -->
    <div class="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <SessionSelector />
      </div>
    </div>
    
    <router-view />
  </div>
</template>

<script setup lang="ts">
import SessionSelector from '@/components/SessionSelector.vue'
</script>

<style scoped>
#app {
  min-height: 100vh;
}
</style>