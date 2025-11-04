<template>
  <div class="min-h-screen christmas-bg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">📋 檢查名單</h1>
        <p class="text-gray-600">查看目前的參與者和獎品列表，確認資料正確性</p>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">參與者總數</p>
              <p class="text-3xl font-bold text-blue-600">{{ participants.length }}</p>
            </div>
            <div class="text-4xl">👥</div>
          </div>
          <div class="mt-2 text-sm text-gray-500">
            已抽獎: {{ winners.length }} | 尚未抽中: {{ activeParticipants.length }}
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">獎品總數</p>
              <p class="text-3xl font-bold text-purple-600">{{ prizes.length }}</p>
            </div>
            <div class="text-4xl">🎁</div>
          </div>
          <div class="mt-2 text-sm text-gray-500">
            獎品總量: {{ totalPrizeQuantity }} 個
          </div>
        </div>
      </div>

      <!-- Participants List -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
          <h2 class="text-xl font-bold text-white flex items-center">
            👥 參與者名單
            <span class="ml-3 text-sm bg-white text-blue-600 px-3 py-1 rounded-full">{{ participants.length }} 人</span>
          </h2>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">電子郵件</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">職位</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">群組</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">狀態</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="participants.length === 0">
                <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                  暫無參與者資料。請先匯入參與者名單。
                </td>
              </tr>
              <tr v-for="(participant, index) in participants" :key="participant.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ index + 1 }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-8 w-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span class="text-white font-bold text-xs">{{ participant.name.charAt(0).toUpperCase() }}</span>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">{{ participant.name }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ participant.email || '-' }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ participant.position || '-' }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ participant.group || '-' }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span v-if="participant.isWinner" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    🏆 已獲獎
                  </span>
                  <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    待抽獎
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Prizes List -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
          <h2 class="text-xl font-bold text-white flex items-center">
            🎁 獎品清單
            <span class="ml-3 text-sm bg-white text-purple-600 px-3 py-1 rounded-full">{{ prizes.length }} 項獎品</span>
          </h2>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">獎品名稱</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">描述</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">數量</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">順序</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">已抽出</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="prizes.length === 0">
                <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                  暫無獎品資料。請先設定獎品清單。
                </td>
              </tr>
              <tr v-for="(prize, index) in prizes" :key="prize.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ index + 1 }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ prize.title }}</div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ prize.description || '-' }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ prize.quantity }} 個
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ prize.order || '-' }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ prize.quantity - prize.remainingQuantity }} / {{ prize.quantity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-8 flex gap-4 justify-center">
        <router-link 
          to="/" 
          class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          ← 返回首頁
        </router-link>
        <router-link 
          to="/draw" 
          class="px-6 py-3 bg-gradient-to-r from-red-500 to-green-600 text-white rounded-lg hover:from-red-600 hover:to-green-700 transition-colors font-medium shadow-lg"
        >
          開始抽獎 →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useParticipantsStore } from '@/stores/participants'
import { usePrizesStore } from '@/stores/prizes'

const participantsStore = useParticipantsStore()
const prizesStore = usePrizesStore()

const { participants, activeParticipants, winners } = storeToRefs(participantsStore)
const { prizes } = storeToRefs(prizesStore)

const totalPrizeQuantity = computed(() => {
  return prizes.value.reduce((sum, prize) => sum + prize.quantity, 0)
})
</script>

<style scoped>
/* Additional Christmas theme styling */
</style>
