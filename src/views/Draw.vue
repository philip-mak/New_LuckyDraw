<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <h1 class="text-2xl font-bold text-gray-900">🎯 幸運抽獎</h1>
          <router-link to="/" class="btn-secondary">← 返回首頁</router-link>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Draw Controls -->
      <div class="card p-6 mb-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">準備抽獎？</h2>
            <p class="text-gray-600">剩餘 {{ activeParticipants.length }} 名參與者</p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-3 items-center">
            <!-- Number of Winners Selection -->
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700 whitespace-nowrap">抽取人數:</label>
              <select 
                v-model="winnersToSelect"
                :disabled="isDrawing"
                class="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                :class="{ 'opacity-50 cursor-not-allowed': isDrawing }"
              >
                <option v-for="num in availableWinnerCounts" :key="num" :value="num">
                  {{ num }} 名
                </option>
              </select>
            </div>
            
            <div class="flex gap-3">
              <button 
                v-if="!isDrawing"
                @click="startDraw"
                :disabled="activeParticipants.length === 0 || winnersToSelect === 0"
                class="btn-primary px-8 py-3 text-lg font-semibold"
                :class="{ 'opacity-50 cursor-not-allowed': activeParticipants.length === 0 || winnersToSelect === 0 }"
              >
                🎲 抽取 {{ winnersToSelect }} 名
              </button>
              
              <button 
                v-else
                @click="stopDraw"
                class="btn-danger px-8 py-3 text-lg font-semibold"
              >
                ⏹️ 停止抽獎
              </button>
              
              <button 
                v-if="winners.length > 0"
                @click="resetDraw"
                class="btn-secondary"
              >
                🔄 重設所有
              </button>
            </div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div v-if="isDrawing" class="mt-4">
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-blue-600 h-2 rounded-full transition-all duration-100"
              :style="{ width: drawProgress + '%' }"
            ></div>
          </div>
          <p class="text-center text-sm text-gray-600 mt-2">
            正在抽取 {{ winnersToSelect }} 名獲獎者...
          </p>
        </div>
      </div>

      <!-- Current Prize -->
      <div v-if="currentPrize" class="card p-6 mb-8 text-center">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">當前獎品</h3>
        <div class="text-2xl font-bold text-purple-600 mb-2">{{ currentPrize.title }}</div>
        <p class="text-gray-600">{{ currentPrize.description }}</p>
        <div class="flex justify-center gap-4 mt-4">
          <div class="text-sm text-gray-500">
            剩餘獎品: {{ currentPrize.remainingQuantity }} / {{ currentPrize.quantity }}
          </div>
          <div class="text-sm text-blue-600">
            本次抽取: {{ Math.min(winnersToSelect, currentPrize.remainingQuantity) }} 名
          </div>
        </div>
        <div v-if="winnersToSelect > currentPrize.remainingQuantity" class="text-sm text-orange-600 mt-2">
          ⚠️ 抽取人數超過剩餘獎品數量，將調整為 {{ currentPrize.remainingQuantity }} 名
        </div>
      </div>

      <!-- Winner Announcement - Single Winner -->
      <div v-if="currentWinners.length === 1" class="card p-8 mb-8 text-center bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
        <div class="text-6xl mb-4">🎉</div>
        <h3 class="text-3xl font-bold text-gray-900 mb-4">恭喜！</h3>
        <div class="text-xl text-gray-700 mb-2">{{ currentWinners[0].name }}</div>
        <div v-if="currentWinners[0].position" class="text-lg text-gray-600 mb-4">{{ currentWinners[0].position }}</div>
        <div class="text-lg font-semibold text-purple-600">獲獎: {{ currentWinners[0].prizeWon }}</div>
        
        <div class="mt-6 flex justify-center gap-4">
          <button @click="confirmWinners" class="btn-primary">確認獲獎者</button>
          <button @click="redraw" class="btn-secondary">重新抽獎</button>
        </div>
      </div>

      <!-- Winner Announcement - Multiple Winners -->
      <div v-else-if="currentWinners.length > 1" class="card p-8 mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
        <div class="text-center">
          <div class="text-6xl mb-4">🎉</div>
          <h3 class="text-3xl font-bold text-gray-900 mb-6">恭喜所有獲獎者！</h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div 
            v-for="(winner, index) in currentWinners" 
            :key="winner.id"
            class="bg-white p-4 rounded-lg border border-yellow-300 text-center"
          >
            <div class="text-2xl mb-2">🏆</div>
            <div class="font-bold text-lg text-gray-900">{{ winner.name }}</div>
            <div v-if="winner.position" class="text-sm text-gray-600">{{ winner.position }}</div>
            <div class="text-purple-600 font-medium mt-2">{{ winner.prizeWon }}</div>
          </div>
        </div>
        
        <div class="flex justify-center gap-4">
          <button @click="confirmWinners" class="btn-primary">確認所有獲獎者</button>
          <button @click="redraw" class="btn-secondary">重新抽獎</button>
        </div>
      </div>

      <!-- Participants Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <ParticipantCard
          v-for="participant in activeParticipants"
          :key="participant.id"
          :participant="participant"
          :is-drawing="isDrawing"
          :is-selected="selectedParticipant?.id === participant.id || currentWinners.some(w => w.id === participant.id)"
          @click="selectParticipant(participant.id)"
        />
      </div>

      <!-- Empty State -->
      <div v-if="activeParticipants.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">🎯</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">無可用參與者</h3>
        <p class="text-gray-600 mb-4">新增一些參與者以開始幸運抽獎！</p>
        <router-link to="/" class="btn-primary">新增參與者</router-link>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useParticipantsStore } from '@/stores/participants'
import { usePrizesStore } from '@/stores/prizes'
import { useSettingsStore } from '@/stores/settings'
import ParticipantCard from '@/components/ParticipantCard.vue'
import type { Participant } from '@/types'

const participantsStore = useParticipantsStore()
const prizesStore = usePrizesStore()
const settingsStore = useSettingsStore()

const currentWinners = ref<Participant[]>([])
const winnersToSelect = ref(1)
const selectedWinners = ref<Participant[]>([])

const { 
  activeParticipants, 
  winners, 
  selectedParticipant,
  selectParticipant,
  markAsWinner,
  clearSelection,
  resetAllWinners
} = participantsStore

const { 
  getNextAvailablePrize, 
  consumePrize 
} = prizesStore

const { 
  settings,
  isDrawing,
  drawProgress,
  startDrawing,
  stopDrawing,
  updateDrawProgress
} = settingsStore

const currentPrize = computed(() => getNextAvailablePrize())

// Calculate available winner count options
const availableWinnerCounts = computed(() => {
  const maxWinners = Math.min(activeParticipants.length, 20) // Cap at 20 for UI reasons
  return Array.from({ length: maxWinners }, (_, i) => i + 1)
})

let drawInterval: number | null = null

const startDraw = () => {
  if (activeParticipants.length === 0 || winnersToSelect.value === 0) return
  
  startDrawing()
  currentWinners.value = []
  selectedWinners.value = []
  clearSelection()
  
  let progress = 0
  const totalDuration = settings.animationDuration
  const intervalTime = 50 // Update every 50ms
  const progressIncrement = (intervalTime / totalDuration) * 100
  
  drawInterval = setInterval(() => {
    progress += progressIncrement
    updateDrawProgress(progress)
    
    // Randomly select participants during animation
    if (progress < 90) {
      const randomIndex = Math.floor(Math.random() * activeParticipants.length)
      const randomParticipant = activeParticipants[randomIndex]
      selectParticipant(randomParticipant.id)
    }
    
    // Stop at 100%
    if (progress >= 100) {
      finalizeDraw()
    }
  }, intervalTime) as unknown as number
}

const stopDraw = () => {
  if (drawInterval) {
    clearInterval(drawInterval)
    drawInterval = null
  }
  stopDrawing()
  currentWinners.value = []
}

const finalizeDraw = () => {
  if (drawInterval) {
    clearInterval(drawInterval)
    drawInterval = null
  }
  
  stopDrawing()
  
  // Select multiple winners, but don't exceed available prizes
  const availableParticipants = [...activeParticipants]
  const newWinners: Participant[] = []
  const maxWinners = currentPrize.value ? 
    Math.min(winnersToSelect.value, currentPrize.value.remainingQuantity, availableParticipants.length) :
    Math.min(winnersToSelect.value, availableParticipants.length)
  
  for (let i = 0; i < maxWinners; i++) {
    const randomIndex = Math.floor(Math.random() * availableParticipants.length)
    const winner = availableParticipants.splice(randomIndex, 1)[0]
    
    if (currentPrize.value) {
      newWinners.push({
        ...winner,
        prizeWon: currentPrize.value.title
      })
    }
  }
  
  currentWinners.value = newWinners
}

const confirmWinners = () => {
  if (currentWinners.value.length > 0 && currentPrize.value) {
    currentWinners.value.forEach((winner, index) => {
      markAsWinner(winner.id, winner.prizeWon)
    })
    
    // Consume prizes based on number of winners
    for (let i = 0; i < currentWinners.value.length; i++) {
      if (currentPrize.value.remainingQuantity > 0) {
        consumePrize(currentPrize.value.id)
      }
    }
    
    currentWinners.value = []
    clearSelection()
  }
}

const redraw = () => {
  currentWinners.value = []
  clearSelection()
  if (activeParticipants.length > 0) {
    setTimeout(() => startDraw(), 500)
  }
}

const resetDraw = () => {
  if (confirm('您確定要重設所有獲獎者嗎？此操作無法復原。')) {
    resetAllWinners()
    prizesStore.resetAllPrizes()
    currentWinners.value = []
    clearSelection()
  }
}

// Watch for changes in active participants and adjust winner selection
watch(
  () => activeParticipants.length,
  (newCount) => {
    if (winnersToSelect.value > newCount) {
      winnersToSelect.value = Math.max(1, newCount)
    }
  }
)

onMounted(() => {
  // Clean up any existing intervals
  if (drawInterval) {
    clearInterval(drawInterval)
  }
  
  // Set initial winner count
  if (activeParticipants.length > 0) {
    winnersToSelect.value = 1
  }
})
</script>