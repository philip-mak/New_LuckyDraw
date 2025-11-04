<template>
  <div class="min-h-screen christmas-bg">
    <!-- Header -->
    <header class="christmas-header">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <h1 class="text-3xl font-bold text-white drop-shadow-lg">🎄 聖誕派對抽獎系統</h1>
            <span class="ml-2 px-2 py-1 sm font-semibold text-white bg-red-700 rounded-full shadow-lg">2025 🎅</span>
          </div>
          <nav class="flex space-x-4">
            <router-link to="/" class="text-white hover:text-yellow-300 transition-colors px-3 py-2 rounded-md font-medium">首頁</router-link>
            <router-link to="/check" class="text-white hover:text-yellow-300 transition-colors px-3 py-2 rounded-md font-medium">檢查名單</router-link>
            <router-link to="/draw" class="text-white hover:text-yellow-300 transition-colors px-3 py-2 rounded-md font-medium">抽獎</router-link>
            <router-link to="/results" class="text-white hover:text-yellow-300 transition-colors px-3 py-2 rounded-md font-medium">結果</router-link>
            <router-link to="/settings" class="text-white hover:text-yellow-300 transition-colors px-3 py-2 rounded-md font-medium">設定</router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Section -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          🎅 歡迎參加聖誕派對抽獎 🎄
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          🎉 聖誕節快樂！準備好迎接聖誕驚喜了嗎？⭐<br/>
          讓我們一起用公平、有趣的方式抽出幸運得主，<br/>
          為這個特別的聖誕派對增添更多歡樂與期待！🎁❄️
        </p>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="card p-6 text-center">
          <div class="text-3xl font-bold text-blue-600 mb-2">{{ totalParticipants }}</div>
          <div class="text-gray-600">參與人數</div>
        </div>
        <div class="card p-6 text-center">
          <div class="text-3xl font-bold text-green-600 mb-2">{{ winners.length }}</div>
          <div class="text-gray-600">已選中獲獎者</div>
        </div>
        <div class="card p-6 text-center">
          <div class="text-3xl font-bold text-purple-600 mb-2">{{ totalPrizes }}</div>
          <div class="text-gray-600">可用獎品</div>
        </div>
      </div>

      <!-- Quick Start: Load Sample Data -->
      <div class="mb-8 text-center">
        <button 
          @click="loadSampleData"
          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-green-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <span class="text-2xl mr-2">🎄</span>
          載入聖誕派對範例數據
          <span class="text-2xl ml-2">🎁</span>
        </button>
        <p class="text-sm text-gray-600 mt-2">快速載入15位參與者和6種聖誕禮物開始測試</p>
      </div>

      <!-- Data Management Section -->
      <div class="card p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
          </svg>
          數據管理
        </h3>
        <p class="text-sm text-gray-600 mb-4">
          匯出當前狀態以便日後恢復，或匯入之前儲存的抽獎進度。資料會自動儲存到瀏覽器。
        </p>
        <div class="flex flex-wrap gap-3">
          <!-- Export Complete State -->
          <button 
            @click="exportCompleteState"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            :disabled="totalParticipants === 0 && totalPrizes === 0"
            :class="{ 'opacity-50 cursor-not-allowed': totalParticipants === 0 && totalPrizes === 0 }"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            匯出完整狀態
          </button>

          <!-- Import State -->
          <label class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
            匯入狀態
            <input 
              type="file" 
              accept=".json" 
              @change="importCompleteState"
              class="hidden"
            />
          </label>

          <!-- Clear All Data -->
          <button 
            @click="confirmClearAll"
            class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            :disabled="totalParticipants === 0 && totalPrizes === 0 && winners.length === 0"
            :class="{ 'opacity-50 cursor-not-allowed': totalParticipants === 0 && totalPrizes === 0 && winners.length === 0 }"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            清除所有資料
          </button>

          <!-- Auto-save Status -->
          <div class="flex items-center text-sm text-gray-600 ml-auto">
            <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            自動儲存已啟用
          </div>
        </div>
      </div>

      <!-- Action Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Add Participants -->
        <div class="card p-6 hover:shadow-lg transition-shadow duration-200">
          <div class="flex items-center mb-4">
            <div class="bg-blue-100 p-3 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 ml-3">新增參與者</h3>
          </div>
          <p class="text-gray-600 mb-4">手動新增參與者或從 CSV 檔案匯入</p>
          <button 
            @click="showAddParticipant = true"
            class="btn-primary w-full"
          >
            開始使用
          </button>
        </div>

        <!-- Setup Prizes -->
        <div class="card p-6 hover:shadow-lg transition-shadow duration-200">
          <div class="flex items-center mb-4">
            <div class="bg-yellow-100 p-3 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 ml-3">設定獎品</h3>
          </div>
          <p class="text-gray-600 mb-4">為獲獎者配置獎品和獎勵</p>
          <button 
            @click="showAddPrize = true"
            class="btn-primary w-full"
          >
            新增獎品
          </button>
        </div>

        <!-- Start Drawing -->
        <div class="card p-6 hover:shadow-lg transition-shadow duration-200">
          <div class="flex items-center mb-4">
            <div class="bg-green-100 p-3 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-10 0h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 ml-3">開始抽獎</h3>
          </div>
          <p class="text-gray-600 mb-4">開始動畫抽選的幸運抽獎</p>
          <router-link 
            to="/draw" 
            class="btn-primary w-full block text-center"
            :class="{ 'opacity-50 cursor-not-allowed': activeParticipants.length === 0 }"
          >
            {{ activeParticipants.length > 0 ? '開始抽獎' : '請先新增參與者' }}
          </router-link>
        </div>
      </div>

      <!-- Recent Activity -->
      <div v-if="winners.length > 0" class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">最近獲獎者</h3>
        <div class="space-y-3">
          <div 
            v-for="winner in winners.slice(0, 5)" 
            :key="winner.id"
            class="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
          >
            <div>
              <div class="font-medium text-gray-900">{{ winner.name }}</div>
              <div class="text-sm text-gray-600">{{ winner.prizeWon || '獎品' }}</div>
            </div>
            <div class="text-sm text-green-600 font-medium">獲獎者 #{{ (winner.drawOrder ?? 0) + 1 }}</div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add Participant Modal -->
    <ParticipantModal 
      v-if="showAddParticipant"
      @close="showAddParticipant = false"
    />

    <!-- Add Prize Modal -->
    <PrizeModal 
      v-if="showAddPrize"
      @close="showAddPrize = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useParticipantsStore } from '@/stores/participants'
import { usePrizesStore } from '@/stores/prizes'
import ParticipantModal from '@/components/ParticipantModal.vue'
import PrizeModal from '@/components/PrizeModal.vue'

const participantsStore = useParticipantsStore()
const prizesStore = usePrizesStore()

const showAddParticipant = ref(false)
const showAddPrize = ref(false)

const { totalParticipants, winners, activeParticipants } = participantsStore
const { totalPrizes } = prizesStore

// Load Christmas-themed sample data
const loadSampleData = () => {
  // Christmas party participants
  const sampleParticipants = [
    { name: '張三', position: '總經理', group: '管理層' },
    { name: '李四', position: '專案經理', group: '管理層' },
    { name: '王五', position: '工程師', group: '技術部' },
    { name: '趙六', position: '設計師', group: '設計部' },
    { name: '陳七', position: '行銷專員', group: '行銷部' },
    { name: '林八', position: '業務經理', group: '業務部' },
    { name: '黃九', position: '人資專員', group: '行政部' },
    { name: '吳十', position: '財務主管', group: '財務部' },
    { name: '周小明', position: '軟體工程師', group: '技術部' },
    { name: '鄭小華', position: 'UI/UX設計師', group: '設計部' },
    { name: '孫小美', position: '客服專員', group: '客服部' },
    { name: '錢大福', position: '倉管人員', group: '物流部' },
    { name: '楊小玉', position: '會計', group: '財務部' },
    { name: '劉大明', position: '系統管理員', group: '技術部' },
    { name: '蔡小芬', position: '秘書', group: '行政部' }
  ]
  
  sampleParticipants.forEach((p) => {
    participantsStore.addParticipant({
      name: p.name,
      position: p.position,
      group: p.group
    })
  })
  
  // Christmas gifts
  const samplePrizes = [
    { title: '🎁 特等獎 - iPhone 15 Pro', description: '最新款 iPhone 15 Pro 256GB', quantity: 1 },
    { title: '🎄 一等獎 - AirPods Pro', description: 'Apple AirPods Pro 第二代', quantity: 2 },
    { title: '⭐ 二等獎 - iPad', description: 'iPad 10.9吋 Wi-Fi 64GB', quantity: 3 },
    { title: '🎅 三等獎 - Apple Watch', description: 'Apple Watch SE', quantity: 5 },
    { title: '❄️ 四等獎 - 禮品卡', description: '購物禮品卡 NT$3,000', quantity: 10 },
    { title: '🌟 參加獎 - 聖誕禮盒', description: '精美聖誕禮物組合', quantity: 20 }
  ]
  
  samplePrizes.forEach((p, index) => {
    prizesStore.addPrize({
      title: p.title,
      description: p.description,
      quantity: p.quantity,
      remainingQuantity: p.quantity,
      order: index + 1
    })
  })
  
  alert('✅ 已載入聖誕派對範例數據！\n👥 15位參與者\n🎁 6種聖誕禮物')
}

// Export complete application state
const exportCompleteState = () => {
  const state = {
    exportDate: new Date().toISOString(),
    version: '1.0',
    participants: participantsStore.$state.participants,
    prizes: prizesStore.$state.prizes,
    settings: {
      // Add any settings if needed
    }
  }

  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `lucky-draw-state-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  alert('✅ 完整狀態已匯出！\n📁 檔案包含所有參與者、獎品和獲獎記錄')
}

// Import complete application state
const importCompleteState = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const state = JSON.parse(e.target?.result as string)
      
      // Validate the imported data
      if (!state.participants || !state.prizes) {
        throw new Error('無效的檔案格式')
      }

      // Confirm before importing
      const participantCount = state.participants.length
      const prizeCount = state.prizes.length
      const winnersCount = state.participants.filter((p: any) => p.isWinner).length

      const confirmed = confirm(
        `即將匯入以下資料:\n\n` +
        `👥 參與者: ${participantCount} 人\n` +
        `🎁 獎品: ${prizeCount} 項\n` +
        `🏆 獲獎者: ${winnersCount} 人\n\n` +
        `⚠️ 此操作將覆蓋當前所有資料！\n是否繼續？`
      )

      if (confirmed) {
        // Clear existing data
        participantsStore.$state.participants = []
        prizesStore.$state.prizes = []

        // Import new data
        participantsStore.$state.participants = state.participants
        prizesStore.$state.prizes = state.prizes

        alert('✅ 資料已成功匯入！\n所有狀態已恢復')
      }
    } catch (error) {
      alert('❌ 匯入失敗！\n請確認檔案格式正確')
      console.error('Import error:', error)
    }
  }
  
  reader.readAsText(file)
  input.value = '' // Reset input
}

// Confirm and clear all data
const confirmClearAll = () => {
  const confirmed = confirm(
    '⚠️ 確定要清除所有資料嗎？\n\n' +
    '這將刪除:\n' +
    `👥 ${totalParticipants} 位參與者\n` +
    `🎁 ${totalPrizes} 個獎品\n` +
    `🏆 ${winners.length} 位獲獎者\n\n` +
    '💡 建議先匯出資料備份！\n此操作無法復原。'
  )

  if (confirmed) {
    participantsStore.$state.participants = []
    prizesStore.$state.prizes = []
    alert('✅ 所有資料已清除！')
  }
}
</script>