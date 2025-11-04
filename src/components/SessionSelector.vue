<template>
  <div class="session-selector">
    <div class="flex items-center gap-3">
      <!-- Session Icon & Label -->
      <div class="flex items-center gap-2">
        <div class="text-lg">🎯</div>
        <span class="text-sm font-medium text-gray-600 hidden sm:inline">抽獎場次:</span>
      </div>

      <!-- Session Dropdown -->
      <div class="relative flex-1 min-w-[200px] max-w-[300px]">
        <select
          v-model="selectedSessionId"
          @change="handleSessionChange"
          class="w-full px-3 py-2 pr-8 text-sm font-medium border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
          :style="{ borderColor: activeSessionColor, backgroundColor: `${activeSessionColor}10` }"
        >
          <option v-for="session in sessionsList" :key="session.id" :value="session.id">
            {{ session.name }} ({{ session.winnersCount }}/{{ session.prizesCount }})
          </option>
        </select>
        
        <!-- Progress Indicator -->
        <div 
          v-if="activeSessionProgress > 0"
          class="absolute bottom-0 left-0 h-1 bg-green-500 rounded-b transition-all"
          :style="{ width: `${activeSessionProgress}%` }"
        ></div>
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

        <!-- Manage Sessions Button -->
        <button
          @click="$router.push('/sessions')"
          class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          title="管理場次"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
import { ref, computed } from 'vue'
import { useSessionsStore } from '@/stores/sessions'
import { useRouter } from 'vue-router'

const router = useRouter()
const sessionsStore = useSessionsStore()

const selectedSessionId = ref(sessionsStore.activeSessionId)
const showNewSessionModal = ref(false)
const newSessionName = ref('')
const newSessionColor = ref('#3b82f6')

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

const activeSessionColor = computed(() => {
  return sessionsStore.activeSession?.color || '#3b82f6'
})

const activeSessionProgress = computed(() => {
  const session = sessionsList.value.find(s => s.id === selectedSessionId.value)
  return session?.progress || 0
})

const handleSessionChange = () => {
  if (selectedSessionId.value) {
    sessionsStore.setActiveSession(selectedSessionId.value)
  }
}

const createNewSession = () => {
  if (newSessionName.value.trim()) {
    const newSession = sessionsStore.createSession(newSessionName.value.trim(), newSessionColor.value)
    selectedSessionId.value = newSession.id
    sessionsStore.setActiveSession(newSession.id)
    
    // Reset form
    newSessionName.value = ''
    newSessionColor.value = '#3b82f6'
    showNewSessionModal.value = false
  }
}
</script>

<style scoped>
.session-selector {
  @apply bg-white rounded-lg shadow-sm border border-gray-200 p-3;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}
</style>
