<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <h1 class="text-3xl font-bold text-gray-900">🎯 幸運抽獎</h1>
            <span class="ml-2 px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">現代版</span>
          </div>
          <nav class="flex space-x-4">
            <router-link to="/" class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md font-medium">首頁</router-link>
            <router-link to="/draw" class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md font-medium">抽獎</router-link>
            <router-link to="/results" class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md font-medium">結果</router-link>
            <router-link to="/settings" class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md font-medium">設定</router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Section -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          歡迎使用現代幸運抽獎
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          一個現代化、免費的線上抽獎應用程式，完美適用於行銷贈品、
          企業活動和慶祝活動。簡單易用、公平且令人興奮！
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
            <div class="text-sm text-green-600 font-medium">獲獎者 #{{ winner.drawOrder + 1 }}</div>
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
</script>