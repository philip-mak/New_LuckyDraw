<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <h1 class="text-2xl font-bold text-gray-900">🏆 結果</h1>
          <router-link to="/" class="btn-secondary">← 返回首頁</router-link>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Results Summary -->
      <div class="card p-6 mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-900">抽獎結果</h2>
          <div class="flex gap-2">
            <button @click="exportResults" class="btn-secondary">
              📊 匯出結果
            </button>
            <button 
              v-if="winners.length > 0"
              @click="clearResults" 
              class="btn-danger"
            >
              🗑️ 清除所有
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <div class="text-2xl font-bold text-blue-600">{{ totalParticipants }}</div>
            <div class="text-sm text-gray-600">參與總數</div>
          </div>
          <div class="text-center p-4 bg-green-50 rounded-lg">
            <div class="text-2xl font-bold text-green-600">{{ winners.length }}</div>
            <div class="text-sm text-gray-600">已選中獲獎者</div>
          </div>
          <div class="text-center p-4 bg-purple-50 rounded-lg">
            <div class="text-2xl font-bold text-purple-600">{{ activeParticipants.length }}</div>
            <div class="text-sm text-gray-600">剩餘</div>
          </div>
        </div>
      </div>

      <!-- Winners List -->
      <div v-if="winners.length > 0" class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">🎉 獲獎者</h3>
        <div class="space-y-3">
          <div 
            v-for="(winner, index) in sortedWinners" 
            :key="winner.id"
            class="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
          >
            <div class="flex items-center gap-4">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span class="text-white font-bold text-sm">{{ index + 1 }}</span>
                </div>
              </div>
              <div>
                <div class="font-semibold text-gray-900">{{ winner.name }}</div>
                <div v-if="winner.position" class="text-sm text-gray-600">{{ winner.position }}</div>
                <div v-if="winner.group" class="text-xs text-gray-500">{{ winner.group }}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="font-medium text-purple-600">{{ winner.prizeWon }}</div>
              <div class="text-xs text-gray-500">第 {{ (winner.drawOrder || 0) + 1 }} 次抽獎</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="text-6xl mb-4">🏆</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">尚無獲獎者</h3>
        <p class="text-gray-600 mb-4">開始抽獎以查看結果！</p>
        <router-link to="/draw" class="btn-primary">開始抽獎</router-link>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useParticipantsStore } from '@/stores/participants'

const participantsStore = useParticipantsStore()

const { 
  totalParticipants, 
  winners, 
  activeParticipants,
  resetAllWinners
} = participantsStore

const sortedWinners = computed(() => 
  [...winners].sort((a, b) => (a.drawOrder || 0) - (b.drawOrder || 0))
)

const exportResults = () => {
  const csv = [
    ['Position', 'Name', 'Email', 'Job Title', 'Group', 'Prize Won', 'Draw Order'],
    ...sortedWinners.value.map((winner, index) => [
      index + 1,
      winner.name,
      winner.email || '',
      winner.position || '',
      winner.group || '',
      winner.prizeWon || '',
      (winner.drawOrder || 0) + 1
    ])
  ]
  
  const csvContent = csv.map(row => 
    row.map(field => `"${field}"`).join(',')
  ).join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  
  link.href = url
  link.download = `lucky-draw-results-${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

const clearResults = () => {
  if (confirm('您確定要清除所有結果嗎？此操作無法復原。')) {
    resetAllWinners()
  }
}
</script>