<template>
  <div 
    class="participant-card"
    :class="{
      'selected': isSelected && !isDrawing,
      'winner': participant.isWinner,
      'drawing-selected': (isDrawing && isSelected) || isTestAnimating,
      'drawing-mode': isDrawing,
      'test-animating': isTestAnimating
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
      
      <!-- Drawing Status Indicator -->
      <div v-if="isDrawing && isSelected" class="mt-1">
        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-red-500 text-white animate-pulse">
          🎯 正在抽選
        </span>
      </div>
      
      <!-- Debug: Always Visible Test Button -->
      <div class="mt-2 space-y-1">
        <button 
          @click.stop="testAnimation"
          class="w-full text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold"
          :class="{ 'bg-red-500': isTestAnimating }"
        >
          {{ isTestAnimating ? '🌈 動畫中...' : '🧪 測試動畫' }}
        </button>
        <div class="text-xs text-gray-500 text-center">
          D:{{ isDrawing ? 'Y' : 'N' }} | S:{{ isSelected ? 'Y' : 'N' }} | T:{{ isTestAnimating ? 'Y' : 'N' }}
        </div>
      </div>
      
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
import { ref, watch } from 'vue'
import type { Participant } from '@/types'

const props = defineProps<{
  participant: Participant
  isSelected?: boolean
  isDrawing?: boolean
}>()

const emit = defineEmits<{
  click: []
  testAnimation: [id: string]
}>()

const isTestAnimating = ref(false)

const testAnimation = () => {
  console.log('🧪 Testing animation for:', props.participant.name)
  isTestAnimating.value = true
  
  setTimeout(() => {
    isTestAnimating.value = false
    console.log('🧪 Test animation complete')
  }, 3000)
}

// Watch for prop changes during drawing
watch([() => props.isDrawing, () => props.isSelected], ([newDrawing, newSelected], [oldDrawing, oldSelected]) => {
  if (newDrawing !== oldDrawing || newSelected !== oldSelected) {
    console.log(`🎭 ${props.participant.name}: Drawing=${newDrawing}, Selected=${newSelected}`)
  }
}, { immediate: true })
</script>

<style scoped>
.participant-card {
  /* Base styles */
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 2px solid #e5e7eb;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.participant-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  border-color: #93c5fd;
}

.participant-card.selected {
  box-shadow: 0 0 0 2px rgb(59, 130, 246) !important;
  background-color: rgb(239, 246, 255) !important;
  transform: scale(1.05) !important;
  border-color: #3b82f6 !important;
}

.participant-card.winner {
  background: linear-gradient(135deg, #dcfce7, #16a34a) !important;
  border-color: #16a34a !important;
  transform: scale(1.05) !important;
}

.participant-card.test-animating {
  /* Same as drawing-selected but for manual testing */
  animation: drawingPulse 0.6s ease-in-out infinite, colorCycle 0.5s linear infinite !important;
  transform: scale(1.3) rotate(5deg) !important;
  z-index: 999 !important;
  border-width: 8px !important;
  border-style: solid !important;
  position: relative !important;
  overflow: visible !important;
  box-shadow: 0 0 80px rgba(255, 0, 0, 1), 0 0 120px rgba(255, 255, 0, 0.8) !important;
  filter: brightness(1.5) contrast(1.3) !important;
}

.participant-card.drawing-mode {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  /* All cards get a subtle indication during drawing mode */
  border-color: #fbbf24 !important;
  background-color: #fef3c7 !important;
}

.participant-card.drawing-selected {
  /* EXTREME VISIBILITY - This should be impossible to miss */
  animation: drawingPulse 0.6s ease-in-out infinite, colorCycle 0.8s linear infinite !important;
  transform: scale(1.3) rotate(5deg) !important;
  z-index: 999 !important;
  border-width: 8px !important;
  border-style: solid !important;
  position: relative !important;
  overflow: visible !important;
  box-shadow: 0 0 80px rgba(255, 0, 0, 1), 0 0 120px rgba(255, 255, 0, 0.8) !important;
  filter: brightness(1.5) contrast(1.3) !important;
}

.participant-card.winner {
  background: linear-gradient(135deg, #dcfce7, #16a34a);
  border-color: #16a34a;
  animation: winnerCelebrate 1s ease-in-out;
}

/* 抽獎脈衝動畫 */
@keyframes drawingPulse {
  0%, 100% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.15);
  }
}

/* 超簡單彩色循環 - 純色背景 */
@keyframes colorCycle {
  0% {
    background-color: #ff0000 !important; /* 純紅色 */
    border-color: #ff0000 !important;
  }
  20% {
    background-color: #ffff00 !important; /* 純黃色 */
    border-color: #ffff00 !important;
  }
  40% {
    background-color: #0080ff !important; /* 純藍色 */
    border-color: #0080ff !important;
  }
  60% {
    background-color: #00ff00 !important; /* 純綠色 */
    border-color: #00ff00 !important;
  }
  80% {
    background-color: #ff00ff !important; /* 純洋紅 */
    border-color: #ff00ff !important;
  }
  100% {
    background-color: #ff0000 !important; /* 回到紅色 */
    border-color: #ff0000 !important;
  }
}

/* 獲獎慶祝動畫 */
@keyframes winnerCelebrate {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1) rotate(5deg);
  }
  50% {
    transform: scale(1.15) rotate(-5deg);
  }
  75% {
    transform: scale(1.1) rotate(3deg);
  }
  100% {
    transform: scale(1.05) rotate(0deg);
  }
}

/* 彩虹邊框效果 */
.participant-card.drawing-selected::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  background: linear-gradient(45deg, 
    #ff6b6b, #feca57, #48dbfb, #1dd1a1, 
    #a55eea, #fd79a8, #ff6b6b);
  background-size: 400% 400%;
  border-radius: inherit;
  z-index: -1;
  animation: rainbowBorder 1s linear infinite;
}

/* 閃光效果 - 更大更明顯 */
.participant-card.drawing-selected::after {
  content: '✨💫⭐';
  position: absolute;
  top: -15px;
  right: -15px;
  font-size: 24px;
  animation: sparkle 0.5s ease-in-out infinite;
  z-index: 150;
  text-shadow: 0 0 10px rgba(255, 255, 0, 0.8);
}

@keyframes rainbowBorder {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes sparkle {
  0%, 100% {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
  25% {
    transform: rotate(90deg) scale(1.2);
    opacity: 0.8;
  }
  50% {
    transform: rotate(180deg) scale(0.8);
    opacity: 0.6;
  }
  75% {
    transform: rotate(270deg) scale(1.1);
    opacity: 0.9;
  }
}
</style>