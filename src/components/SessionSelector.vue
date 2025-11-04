<template>
  <div class="session-selector">
    <div class="flex items-center gap-3">
      <!-- Session Icon & Label -->
      <div class="flex items-center gap-2">
        <div class="text-lg">🎯</div>
        <span class="text-sm font-medium text-gray-600 hidden sm:inline">抽獎場次:</span>
      </div>

      <!-- Session Swiper (Mobile) -->
      <div 
        class="swipe-container relative flex-1 min-w-[200px] max-w-[400px] overflow-hidden"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div 
          class="swipe-track flex transition-transform duration-300 ease-out"
          :style="{ transform: `translateX(${swipeOffset}px)` }"
        >
          <div
            v-for="session in sessionsList"
            :key="session.id"
            class="swipe-item flex-shrink-0 w-full px-1"
            @click="selectSession(session.id)"
          >
            <div
              class="session-card p-3 rounded-lg border-2 cursor-pointer transition-all"
              :class="{ 'ring-2 ring-offset-2': session.id === selectedSessionId }"
              :style="{ 
                borderColor: session.id === selectedSessionId ? session.color : '#e5e7eb',
                backgroundColor: session.id === selectedSessionId ? `${session.color}10` : 'white',
                '--ring-color': session.color
              }"
            >
              <div class="flex items-center justify-between mb-1">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: session.color }"></div>
                  <span class="font-medium text-sm truncate">{{ session.name }}</span>
                </div>
                <span class="text-xs text-gray-500">
                  {{ session.winnersCount }}/{{ session.prizesCount }}
                </span>
              </div>
              
              <!-- Progress Bar -->
              <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  class="h-full transition-all duration-300"
                  :style="{ 
                    width: `${session.progress}%`,
                    backgroundColor: session.color 
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Swipe Indicators -->
        <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
          <div
            v-for="(session, index) in sessionsList"
            :key="session.id"
            class="w-1.5 h-1.5 rounded-full transition-all"
            :class="index === currentSwipeIndex ? 'bg-blue-500 w-4' : 'bg-gray-300'"
          ></div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-2">
        <!-- New Session Button -->
        <button
          @click="showNewSessionModal = true"
          class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="建立新場次"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>

    <!-- New Session Modal -->
    <div
      v-if="showNewSessionModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showNewSessionModal = false"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <h3 class="text-xl font-bold text-gray-900 mb-4">建立新場次</h3>
        
        <div class="space-y-4">
          <!-- Session Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">場次名稱</label>
            <input
              v-model="newSessionName"
              type="text"
              placeholder="例如: VIP 抽獎、員工抽獎"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              @keyup.enter="createNewSession"
            />
          </div>

          <!-- Session Color -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">場次顏色</label>
            <div class="grid grid-cols-6 gap-2">
              <button
                v-for="color in colorOptions"
                :key="color"
                @click="newSessionColor = color"
                class="w-10 h-10 rounded-lg border-2 transition-all"
                :class="newSessionColor === color ? 'border-gray-900 scale-110' : 'border-gray-300'"
                :style="{ backgroundColor: color }"
              ></button>
            </div>
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button
            @click="createNewSession"
            class="flex-1 btn-primary"
            :disabled="!newSessionName.trim()"
            :class="{ 'opacity-50 cursor-not-allowed': !newSessionName.trim() }"
          >
            建立場次
          </button>
          <button
            @click="showNewSessionModal = false"
            class="flex-1 btn-secondary"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useSessionsStore } from '@/stores/sessions'

const sessionsStore = useSessionsStore()

const selectedSessionId = ref(sessionsStore.activeSessionId)
const showNewSessionModal = ref(false)
const newSessionName = ref('')
const newSessionColor = ref('#3b82f6')

// Swipe functionality
const swipeStartX = ref(0)
const swipeOffset = ref(0)
const currentSwipeIndex = ref(0)
const isSwipping = ref(false)

const colorOptions = [
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Orange
  '#ef4444', // Red
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#14b8a6', // Teal
  '#f97316', // Orange
  '#6366f1', // Indigo
  '#84cc16', // Lime
  '#06b6d4', // Cyan
  '#f43f5e'  // Rose
]

const sessionsList = computed(() => sessionsStore.sessionsList)

// Update swipe index when active session changes
watch(() => sessionsStore.activeSessionId, (newId) => {
  selectedSessionId.value = newId
  const index = sessionsList.value.findIndex(s => s.id === newId)
  if (index !== -1) {
    currentSwipeIndex.value = index
    updateSwipePosition()
  }
})

const selectSession = (sessionId: string) => {
  selectedSessionId.value = sessionId
  sessionsStore.setActiveSession(sessionId)
}

const handleTouchStart = (e: TouchEvent) => {
  swipeStartX.value = e.touches[0].clientX
  isSwipping.value = true
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isSwipping.value) return
  
  const currentX = e.touches[0].clientX
  const diff = currentX - swipeStartX.value
  swipeOffset.value = diff - (currentSwipeIndex.value * window.innerWidth * 0.9)
}

const handleTouchEnd = () => {
  if (!isSwipping.value) return
  isSwipping.value = false
  
  const threshold = 50
  const diff = swipeOffset.value + (currentSwipeIndex.value * window.innerWidth * 0.9)
  
  if (diff > threshold && currentSwipeIndex.value > 0) {
    // Swipe right - previous session
    currentSwipeIndex.value--
  } else if (diff < -threshold && currentSwipeIndex.value < sessionsList.value.length - 1) {
    // Swipe left - next session
    currentSwipeIndex.value++
  }
  
  updateSwipePosition()
  
  // Update active session
  const newSession = sessionsList.value[currentSwipeIndex.value]
  if (newSession) {
    selectSession(newSession.id)
  }
}

const updateSwipePosition = () => {
  const containerWidth = window.innerWidth * 0.9
  swipeOffset.value = -(currentSwipeIndex.value * containerWidth)
}

const createNewSession = () => {
  if (newSessionName.value.trim()) {
    const newSession = sessionsStore.createSession(newSessionName.value.trim(), newSessionColor.value)
    selectSession(newSession.id)
    
    // Reset form
    newSessionName.value = ''
    newSessionColor.value = '#3b82f6'
    showNewSessionModal.value = false
  }
}
</script>

<style scoped>
.session-selector {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid #e5e7eb;
  padding: 0.75rem;
}

.swipe-container {
  user-select: none;
  -webkit-user-select: none;
  touch-action: pan-y;
}

.swipe-item {
  min-width: 100%;
}
</style>

