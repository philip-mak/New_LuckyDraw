<template>
  <div 
    class="participant-card"
    :class="{
      'selected': isSelected,
      'winner': participant.isWinner,
      'animate-bounce': isDrawing && isSelected
    }"
    @click="$emit('click')"
  >
    <div class="text-center">
      <!-- Avatar -->
      <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
        <span class="text-white font-bold text-lg">
          {{ participant.name.charAt(0).toUpperCase() }}
        </span>
      </div>
      
      <!-- Name -->
      <h3 class="font-semibold text-gray-900 text-sm mb-1 truncate">
        {{ participant.name }}
      </h3>
      
      <!-- Position -->
      <p v-if="participant.position" class="text-xs text-gray-600 truncate">
        {{ participant.position }}
      </p>
      
      <!-- Group -->
      <p v-if="participant.group" class="text-xs text-gray-500 truncate mt-1">
        {{ participant.group }}
      </p>
      
      <!-- Winner Badge -->
      <div v-if="participant.isWinner" class="mt-2">
        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          🏆 獲獎者
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Participant } from '@/types'

defineProps<{
  participant: Participant
  isSelected?: boolean
  isDrawing?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.participant-card {
  @apply relative overflow-hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.participant-card:hover {
  @apply transform -translate-y-1;
}

.participant-card.selected {
  @apply ring-2 ring-blue-500 ring-opacity-50;
}

.participant-card.winner {
  @apply bg-gradient-to-br from-green-50 to-emerald-50 border-green-300;
}
</style>