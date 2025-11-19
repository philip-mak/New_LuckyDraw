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

      <!-- Winners Showcase with Rainbow Animation -->
      <div v-if="winners.length > 0" class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div class="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
          <h2 class="text-xl font-bold text-white flex items-center">
            🏆 獲獎者展示 (Rainbow Animation)
            <span class="ml-3 text-sm bg-white text-green-600 px-3 py-1 rounded-full">{{ winners.length }} 位</span>
          </h2>
        </div>
        
        <div class="p-6">
          <p class="text-sm text-gray-600 mb-4">✨ 獲獎者卡片會自動顯示彩虹循環動畫效果</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <ParticipantCard
              v-for="winner in winners"
              :key="winner.id"
              :participant="winner"
              :is-drawing="false"
              :is-selected="false"
            />
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
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="participants.length === 0">
                <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                  暫無參與者資料。請先匯入參與者名單。
                </td>
              </tr>
              <tr v-for="(participant, index) in participants" :key="participant.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ index + 1 }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div v-if="editingParticipantId === participant.id" class="flex items-center">
                    <input
                      v-model="editingParticipant.name"
                      type="text"
                      class="w-full px-2 py-1 text-sm border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="姓名"
                    />
                  </div>
                  <div v-else class="flex items-center">
                    <div class="flex-shrink-0 h-8 w-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span class="text-white font-bold text-xs">{{ participant.name.charAt(0).toUpperCase() }}</span>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">{{ participant.name }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    v-if="editingParticipantId === participant.id"
                    v-model="editingParticipant.email"
                    type="email"
                    class="w-full px-2 py-1 text-sm border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="電子郵件"
                  />
                  <span v-else>{{ participant.email || '-' }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    v-if="editingParticipantId === participant.id"
                    v-model="editingParticipant.position"
                    type="text"
                    class="w-full px-2 py-1 text-sm border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="職位"
                  />
                  <span v-else>{{ participant.position || '-' }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    v-if="editingParticipantId === participant.id"
                    v-model="editingParticipant.group"
                    type="text"
                    class="w-full px-2 py-1 text-sm border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="群組"
                  />
                  <span v-else>{{ participant.group || '-' }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span v-if="participant.isWinner" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    🏆 已獲獎
                  </span>
                  <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    待抽獎
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div v-if="editingParticipantId === participant.id" class="flex justify-end gap-2">
                    <button
                      @click="saveParticipant"
                      class="text-green-600 hover:text-green-900 font-medium"
                    >
                      ✓ 儲存
                    </button>
                    <button
                      @click="cancelEditParticipant"
                      class="text-gray-600 hover:text-gray-900 font-medium"
                    >
                      ✕ 取消
                    </button>
                  </div>
                  <div v-else class="flex justify-end gap-2">
                    <button
                      @click="startEditParticipant(participant)"
                      class="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      ✎ 編輯
                    </button>
                    <button
                      @click="confirmDeleteParticipant(participant)"
                      class="text-red-600 hover:text-red-900 font-medium"
                      :disabled="participant.isWinner"
                      :class="{ 'opacity-50 cursor-not-allowed': participant.isWinner }"
                    >
                      🗑 刪除
                    </button>
                  </div>
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
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="prizes.length === 0">
                <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                  暫無獎品資料。請先設定獎品清單。
                </td>
              </tr>
              <tr v-for="(prize, index) in prizes" :key="prize.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ index + 1 }}</td>
                <td class="px-6 py-4">
                  <input
                    v-if="editingPrizeId === prize.id"
                    v-model="editingPrize.title"
                    type="text"
                    class="w-full px-2 py-1 text-sm border border-purple-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="獎品名稱"
                  />
                  <div v-else class="text-sm font-medium text-gray-900">{{ prize.title }}</div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  <input
                    v-if="editingPrizeId === prize.id"
                    v-model="editingPrize.description"
                    type="text"
                    class="w-full px-2 py-1 text-sm border border-purple-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="描述"
                  />
                  <span v-else>{{ prize.description || '-' }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    v-if="editingPrizeId === prize.id"
                    v-model.number="editingPrize.quantity"
                    type="number"
                    min="1"
                    class="w-20 px-2 py-1 text-sm border border-purple-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ prize.quantity }} 個
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    v-if="editingPrizeId === prize.id"
                    v-model.number="editingPrize.order"
                    type="number"
                    min="1"
                    class="w-20 px-2 py-1 text-sm border border-purple-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <span v-else>{{ prize.order || '-' }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ prize.quantity - prize.remainingQuantity }} / {{ prize.quantity }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div v-if="editingPrizeId === prize.id" class="flex justify-end gap-2">
                    <button
                      @click="savePrize"
                      class="text-green-600 hover:text-green-900 font-medium"
                    >
                      ✓ 儲存
                    </button>
                    <button
                      @click="cancelEditPrize"
                      class="text-gray-600 hover:text-gray-900 font-medium"
                    >
                      ✕ 取消
                    </button>
                  </div>
                  <div v-else class="flex justify-end gap-2">
                    <button
                      @click="startEditPrize(prize)"
                      class="text-purple-600 hover:text-purple-900 font-medium"
                    >
                      ✎ 編輯
                    </button>
                    <button
                      @click="confirmDeletePrize(prize)"
                      class="text-red-600 hover:text-red-900 font-medium"
                    >
                      🗑 刪除
                    </button>
                  </div>
                </td>
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
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useParticipantsStore } from '@/stores/participants'
import { usePrizesStore } from '@/stores/prizes'
import ParticipantCard from '@/components/ParticipantCard.vue'
import type { Participant, Prize } from '@/types'

const participantsStore = useParticipantsStore()
const prizesStore = usePrizesStore()

const { participants, activeParticipants, winners } = storeToRefs(participantsStore)
const { prizes } = storeToRefs(prizesStore)

const totalPrizeQuantity = computed(() => {
  return prizes.value.reduce((sum, prize) => sum + prize.quantity, 0)
})

// Participant editing state
const editingParticipantId = ref<string | null>(null)
const editingParticipant = ref<Partial<Participant>>({})

const startEditParticipant = (participant: Participant) => {
  editingParticipantId.value = participant.id
  editingParticipant.value = {
    name: participant.name,
    email: participant.email,
    position: participant.position,
    group: participant.group
  }
}

const saveParticipant = () => {
  if (editingParticipantId.value && editingParticipant.value.name) {
    participantsStore.updateParticipant(editingParticipantId.value, {
      name: editingParticipant.value.name,
      email: editingParticipant.value.email || '',
      position: editingParticipant.value.position || '',
      group: editingParticipant.value.group || ''
    })
    cancelEditParticipant()
  } else {
    alert('❌ 姓名為必填項目！')
  }
}

const cancelEditParticipant = () => {
  editingParticipantId.value = null
  editingParticipant.value = {}
}

const confirmDeleteParticipant = (participant: Participant) => {
  if (participant.isWinner) {
    alert('⚠️ 無法刪除已獲獎的參與者！\n請先重設抽獎結果。')
    return
  }
  
  const confirmed = confirm(`確定要刪除參與者「${participant.name}」嗎？\n此操作無法復原。`)
  if (confirmed) {
    participantsStore.removeParticipant(participant.id)
  }
}

// Prize editing state
const editingPrizeId = ref<string | null>(null)
const editingPrize = ref<Partial<Prize>>({})

const startEditPrize = (prize: Prize) => {
  editingPrizeId.value = prize.id
  editingPrize.value = {
    title: prize.title,
    description: prize.description,
    quantity: prize.quantity,
    order: prize.order
  }
}

const savePrize = () => {
  if (editingPrizeId.value && editingPrize.value.title && editingPrize.value.quantity) {
    prizesStore.updatePrize(editingPrizeId.value, {
      title: editingPrize.value.title,
      description: editingPrize.value.description || '',
      quantity: editingPrize.value.quantity,
      order: editingPrize.value.order || 0
    })
    cancelEditPrize()
  } else {
    alert('❌ 獎品名稱和數量為必填項目！')
  }
}

const cancelEditPrize = () => {
  editingPrizeId.value = null
  editingPrize.value = {}
}

const confirmDeletePrize = (prize: Prize) => {
  const usedQuantity = prize.quantity - prize.remainingQuantity
  if (usedQuantity > 0) {
    alert(`⚠️ 此獎品已被抽出 ${usedQuantity} 個，無法刪除！\n請先重設抽獎結果。`)
    return
  }
  
  const confirmed = confirm(`確定要刪除獎品「${prize.title}」嗎？\n此操作無法復原。`)
  if (confirmed) {
    prizesStore.removePrize(prize.id)
  }
}
</script>

<style scoped>
/* Additional Christmas theme styling */
</style>
