<template>
  <div class="min-h-screen christmas-bg">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">🎯 幸運抽獎</h1>
            <p v-if="activeSession" class="text-sm text-gray-600 mt-1">
              場次: <span class="font-medium" :style="{ color: activeSession.color }">{{ activeSession.name }}</span>
            </p>
          </div>
          <router-link to="/" class="btn-secondary">← 返回首頁</router-link>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Info Banner -->
      <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="flex items-start gap-3">
          <div class="text-2xl">ℹ️</div>
          <div class="flex-1">
            <h4 class="font-semibold text-blue-900 mb-1">抽獎規則</h4>
            <ul class="text-sm text-blue-800 space-y-1">
              <li>• 獎品將按照<strong>優先順序</strong>分配（從上到下）</li>
              <li>• 當獎品數量為1時，系統會<strong>自動切換</strong>到下一個獎品</li>
              <li>• 每位獲獎者會顯示對應的<strong>獎品名稱</strong></li>
              <li>• 可一次抽取多名獲獎者，每人可能獲得不同獎品</li>
            </ul>
          </div>
        </div>
      </div>

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

      <!-- Available Prizes Queue -->
      <div v-if="availablePrizes.length > 0" class="card p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4 text-center">📋 待抽獎品清單（按優先順序）</h3>
        <div class="space-y-3">
          <div 
            v-for="(prize, index) in availablePrizes.slice(0, 5)" 
            :key="prize.id"
            class="flex items-center justify-between p-4 rounded-lg border-2 transition-all"
            :class="index === 0 ? 'bg-purple-50 border-purple-300' : 'bg-gray-50 border-gray-200'"
          >
            <div class="flex items-center gap-3">
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                :class="index === 0 ? 'bg-purple-600' : 'bg-gray-400'"
              >
                {{ index + 1 }}
              </div>
              <div>
                <div class="font-semibold text-gray-900">{{ prize.title }}</div>
                <div class="text-sm text-gray-600">{{ prize.description }}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-lg font-bold text-purple-600">{{ prize.remainingQuantity }}</div>
              <div class="text-xs text-gray-500">剩餘數量</div>
            </div>
          </div>
        </div>
        <div v-if="availablePrizes.length > 5" class="text-center text-sm text-gray-500 mt-3">
          還有 {{ availablePrizes.length - 5 }} 項獎品...
        </div>
      </div>

      <!-- Winner Announcement - Single Winner -->
      <div v-if="currentWinners.length === 1" class="card p-8 mb-8 text-center bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 relative z-30">
        <div class="text-6xl mb-4">🎉</div>
        <h3 class="text-3xl font-bold text-gray-900 mb-4">恭喜！</h3>
        
        <!-- Use ParticipantCard with rainbow animation -->
        <div class="flex justify-center mb-6">
          <div class="w-64">
            <ParticipantCard :participant="currentWinners[0]" />
          </div>
        </div>
        
        <div class="text-lg font-semibold text-purple-600 mb-4">獲獎: {{ currentWinners[0].prizeWon }}</div>
        
        <div class="mt-6 flex justify-center gap-4">
          <button @click="confirmWinners" class="btn-primary">確認獲獎者</button>
          <button @click="redraw" class="btn-secondary">重新抽獎</button>
        </div>
      </div>

      <!-- Winner Announcement - Multiple Winners -->
      <div v-else-if="currentWinners.length > 1" class="card p-8 mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 relative z-30">
        <div class="text-center">
          <div class="text-6xl mb-4">🎉</div>
          <h3 class="text-3xl font-bold text-gray-900 mb-6">恭喜所有獲獎者！</h3>
        </div>
        
        <!-- Use ParticipantCard with rainbow animation and show prize -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          <div v-for="winner in currentWinners" :key="winner.id" class="relative">
            <ParticipantCard :participant="winner" />
            <!-- Prize badge -->
            <div class="mt-2 px-3 py-1.5 bg-purple-100 border border-purple-300 rounded-lg text-center">
              <div class="text-xs font-medium text-purple-900">🎁 {{ winner.prizeWon }}</div>
            </div>
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
import { storeToRefs } from 'pinia'
import { useParticipantsStore } from '@/stores/participants'
import { usePrizesStore } from '@/stores/prizes'
import { useSessionsStore } from '@/stores/sessions'
import { useSettingsStore } from '@/stores/settings'
import ParticipantCard from '@/components/ParticipantCard.vue'
import type { Participant } from '@/types'

const participantsStore = useParticipantsStore()
const prizesStore = usePrizesStore()
const sessionsStore = useSessionsStore()
const settingsStore = useSettingsStore()

const activeSession = computed(() => sessionsStore.activeSession)

const currentWinners = ref<Participant[]>([])
const winnersToSelect = ref(1)
const selectedWinners = ref<Participant[]>([])
const currentDrawPrizeIds = ref<string[]>([]) // Track prizes consumed in current draw

// Use storeToRefs to maintain reactivity!
const { 
  activeParticipants, 
  winners, 
  selectedParticipant
} = storeToRefs(participantsStore)

// Available prizes sorted by order
const availablePrizes = computed(() => {
  return prizesStore.availablePrizes
})

// Get methods directly from store (these don't need refs)
const {
  selectParticipant,
  markAsWinner,
  clearSelection,
  resetAllWinners
} = participantsStore

const { 
  getNextAvailablePrize, 
  consumePrize,
  returnPrize
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
  const maxWinners = Math.min(activeParticipants.value.length, 20) // Cap at 20 for UI reasons
  return Array.from({ length: maxWinners }, (_, i) => i + 1)
})

let drawInterval: number | null = null

const startDraw = () => {
  if (activeParticipants.value.length === 0 || winnersToSelect.value === 0) return
  
  // Check if there are any available prizes before starting
  if (availablePrizes.value.length === 0) {
    alert('❌ 沒有可用的獎品！\n請先新增獎品或重設獎品數量。')
    return
  }
  
  startDrawing()
  currentWinners.value = []
  selectedWinners.value = []
  currentDrawPrizeIds.value = [] // Reset prize tracking
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
      // Clear previous selection first to ensure only one card animates
      clearSelection()
      
      const randomIndex = Math.floor(Math.random() * activeParticipants.value.length)
      const randomParticipant = activeParticipants.value[randomIndex]
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
  clearSelection() // Clear any selected participant before showing winners
  
  // Select multiple winners
  const availableParticipants = [...activeParticipants.value]
  const newWinners: Participant[] = []
  const numberOfWinners = Math.min(winnersToSelect.value, availableParticipants.length)
  
  for (let i = 0; i < numberOfWinners; i++) {
    // Get fresh list of available prizes (sorted by order)
    const availablePrizesList = prizesStore.availablePrizes
    
    if (availablePrizesList.length === 0) {
      // Return all prizes consumed so far in this draw
      currentDrawPrizeIds.value.forEach(prizeId => {
        returnPrize(prizeId)
      })
      currentDrawPrizeIds.value = []
      
      // Show alert only once with the correct count
      if (newWinners.length > 0) {
        alert(`⚠️ 只有 ${newWinners.length} 個可用獎品！\n已抽取 ${newWinners.length} 位獲獎者。`)
      } else {
        alert('❌ 沒有可用的獎品！\n請先新增獎品或重設獎品數量。')
        currentWinners.value = []
        return
      }
      break
    }
    
    // Get the first available prize (highest priority)
    const assignedPrize = availablePrizesList[0]
    
    // Select random participant
    const randomIndex = Math.floor(Math.random() * availableParticipants.length)
    const winner = availableParticipants.splice(randomIndex, 1)[0]
    
    // Assign prize to winner
    newWinners.push({
      ...winner,
      prizeWon: assignedPrize.title,
      isWinner: true  // Set isWinner to true for rainbow animation
    })
    
    // Consume the prize immediately (this updates the store)
    consumePrize(assignedPrize.id)
    // Track this prize so we can return it if redrawing
    currentDrawPrizeIds.value.push(assignedPrize.id)
  }
  
  currentWinners.value = newWinners
}

const confirmWinners = () => {
  if (currentWinners.value.length > 0) {
    currentWinners.value.forEach((winner) => {
      markAsWinner(winner.id, winner.prizeWon)
    })
     
    currentWinners.value = []
    currentDrawPrizeIds.value = [] // Clear prize tracking after confirmation
    clearSelection()
  }
}

const redraw = () => {
  // Return all prizes consumed in this draw
  currentDrawPrizeIds.value.forEach(prizeId => {
    returnPrize(prizeId)
  })
  
  currentWinners.value = []
  currentDrawPrizeIds.value = []
  clearSelection()
  if (activeParticipants.value.length > 0) {
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
  () => activeParticipants.value.length,
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
  if (activeParticipants.value.length > 0) {
    winnersToSelect.value = 1
  }
})
</script>