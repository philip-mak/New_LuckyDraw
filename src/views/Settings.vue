<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <h1 class="text-2xl font-bold text-gray-900">⚙️ 設定</h1>
          <router-link to="/" class="btn-secondary">← 返回首頁</router-link>
        </div>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Draw Settings -->
      <div class="card p-6 mb-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">抽獎動畫設定</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              動畫持續時間: {{ settings.animationDuration / 1000 }} 秒
            </label>
            <input
              :value="settings.animationDuration"
              @input="updateSetting('animationDuration', Number(($event.target as HTMLInputElement).value))"
              type="range"
              min="1000"
              max="10000"
              step="500"
              class="w-full"
            />
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>1秒 (快)</span>
              <span>10秒 (慢)</span>
            </div>
          </div>

          <div class="flex items-center">
            <input
              :checked="settings.showParticipantInfo"
              @change="updateSetting('showParticipantInfo', ($event.target as HTMLInputElement).checked)"
              type="checkbox"
              id="showInfo"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="showInfo" class="ml-2 block text-sm text-gray-900">
              在卡片上顯示參與者詳細資訊
            </label>
          </div>

          <div class="flex items-center">
            <input
              :checked="settings.enableSounds"
              @change="updateSetting('enableSounds', ($event.target as HTMLInputElement).checked)"
              type="checkbox"
              id="enableSounds"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="enableSounds" class="ml-2 block text-sm text-gray-900">
              啟用音效
            </label>
          </div>

          <div class="flex items-center">
            <input
              :checked="settings.allowDuplicateWinners"
              @change="updateSetting('allowDuplicateWinners', ($event.target as HTMLInputElement).checked)"
              type="checkbox"
              id="allowDuplicates"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="allowDuplicates" class="ml-2 block text-sm text-gray-900">
              允許同一人多次獲獎
            </label>
          </div>
        </div>
      </div>

      <!-- Appearance Settings -->
      <div class="card p-6 mb-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">外觀</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">主題</label>
            <select
              :value="settings.theme"
              @change="updateSetting('theme', ($event.target as HTMLSelectElement).value as 'light' | 'dark')"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="light">淺色</option>
              <option value="dark">深色</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">卡片樣式</label>
            <select
              :value="settings.cardStyle"
              @change="updateSetting('cardStyle', ($event.target as HTMLSelectElement).value as 'default' | 'compact' | 'detailed')"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="default">預設</option>
              <option value="compact">簡潔</option>
              <option value="detailed">詳細</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Data Management -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">資料管理</h2>
        
        <div class="space-y-4">
          <div class="flex gap-3">
            <button @click="exportAllData" class="btn-secondary">
              📤 匯出所有資料
            </button>
            <button @click="importData" class="btn-secondary">
              📥 匯入資料
            </button>
          </div>
          
          <div class="border-t pt-4">
            <h3 class="text-sm font-medium text-gray-900 mb-2">重設選項</h3>
            <div class="flex gap-2 flex-wrap">
              <button @click="resetParticipants" class="btn-secondary text-sm">
                重設參與者
              </button>
              <button @click="resetPrizes" class="btn-secondary text-sm">
                重設獎品
              </button>
              <button @click="resetSettings" class="btn-secondary text-sm">
                重設設定
              </button>
              <button @click="resetAll" class="btn-danger text-sm">
                重設所有
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Hidden file input for import -->
    <input 
      ref="fileInput" 
      type="file" 
      accept=".json" 
      @change="handleFileImport" 
      class="hidden"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useParticipantsStore } from '@/stores/participants'
import { usePrizesStore } from '@/stores/prizes'
import { useSettingsStore } from '@/stores/settings'

const participantsStore = useParticipantsStore()
const prizesStore = usePrizesStore()
const settingsStore = useSettingsStore()

const { settings, updateSetting, resetSettings } = settingsStore
const fileInput = ref<HTMLInputElement | null>(null)

const exportAllData = () => {
  const data = {
    participants: participantsStore.participants,
    prizes: prizesStore.prizes,
    settings: settings,
    exportDate: new Date().toISOString()
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  
  link.href = url
  link.download = `lucky-draw-data-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

const importData = () => {
  fileInput.value?.click()
}

const handleFileImport = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file && file.type === 'application/json') {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        
        if (data.participants) {
          participantsStore.clearAllParticipants()
          participantsStore.addParticipants(data.participants)
        }
        
        if (data.prizes) {
          prizesStore.clearAllPrizes()
          data.prizes.forEach((prize: any) => prizesStore.addPrize(prize))
        }
        
        if (data.settings) {
          Object.entries(data.settings).forEach(([key, value]) => {
            updateSetting(key as keyof typeof settings, value as any)
          })
        }
        
        alert('資料匯入成功！')
      } catch (error) {
        alert('匯入資料時發生錯誤，請檢查檔案格式。')
      }
    }
    reader.readAsText(file)
  }
}

const resetParticipants = () => {
  if (confirm('您確定要移除所有參與者嗎？')) {
    participantsStore.clearAllParticipants()
  }
}

const resetPrizes = () => {
  if (confirm('您確定要移除所有獎品嗎？')) {
    prizesStore.clearAllPrizes()
  }
}

const resetAll = () => {
  if (confirm('您確定要重設所有內容嗎？這將移除所有資料且無法復原。')) {
    participantsStore.clearAllParticipants()
    prizesStore.clearAllPrizes()
    resetSettings()
  }
}
</script>