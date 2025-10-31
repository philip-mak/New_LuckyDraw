<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900">新增參與者</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="space-y-4">
        <!-- Single Participant Form -->
        <div>
          <h4 class="font-medium text-gray-900 mb-2">新增單一參與者</h4>
          <div class="space-y-3">
            <input
              v-model="singleParticipant.name"
              type="text"
              placeholder="姓名 *"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <input
              v-model="singleParticipant.email"
              type="email"
              placeholder="電子郵件 (選填)"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              v-model="singleParticipant.position"
              type="text"
              placeholder="職位/職稱 (選填)"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              v-model="singleParticipant.group"
              type="text"
              placeholder="群組/部門 (選填)"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button 
              @click="addSingleParticipant"
              :disabled="!singleParticipant.name.trim()"
              class="btn-primary w-full"
              :class="{ 'opacity-50 cursor-not-allowed': !singleParticipant.name.trim() }"
            >
              新增參與者
            </button>
          </div>
        </div>

        <div class="border-t pt-4">
          <h4 class="font-medium text-gray-900 mb-2">從 CSV 匯入</h4>
          <div class="space-y-3">
            <div class="text-sm text-gray-600">
              上傳包含以下欄位的 CSV 檔案: 姓名, 電子郵件, 職位, 群組
            </div>
            <input
              ref="fileInput"
              type="file"
              accept=".csv"
              @change="handleFileUpload"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
            <div class="text-xs text-gray-500">
              CSV 格式範例:<br/>
              姓名,電子郵件,職位,群組<br/>
              陳小明,chen@example.com,工程師,技術部
            </div>
          </div>
        </div>

        <div class="border-t pt-4">
          <h4 class="font-medium text-gray-900 mb-2">批量新增 (一行一個)</h4>
          <textarea
            v-model="bulkNames"
            placeholder="請輸入姓名，一行一個..."
            rows="4"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
          <button 
            @click="addBulkParticipants"
            :disabled="!bulkNames.trim()"
            class="btn-secondary w-full mt-2"
            :class="{ 'opacity-50 cursor-not-allowed': !bulkNames.trim() }"
          >
            新增所有姓名
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useParticipantsStore } from '@/stores/participants'

const participantsStore = useParticipantsStore()

defineEmits<{
  close: []
}>()

const singleParticipant = ref({
  name: '',
  email: '',
  position: '',
  group: ''
})

const bulkNames = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

const addSingleParticipant = () => {
  if (singleParticipant.value.name.trim()) {
    participantsStore.addParticipant({
      name: singleParticipant.value.name.trim(),
      email: singleParticipant.value.email.trim() || undefined,
      position: singleParticipant.value.position.trim() || undefined,
      group: singleParticipant.value.group.trim() || undefined
    })
    
    // Reset form
    singleParticipant.value = {
      name: '',
      email: '',
      position: '',
      group: ''
    }
  }
}

const addBulkParticipants = () => {
  const names = bulkNames.value
    .split('\n')
    .map(name => name.trim())
    .filter(name => name.length > 0)
  
  names.forEach(name => {
    participantsStore.addParticipant({ name })
  })
  
  bulkNames.value = ''
}

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file && file.type === 'text/csv') {
    const reader = new FileReader()
    reader.onload = (e) => {
      const csvData = e.target?.result as string
      if (csvData) {
        participantsStore.importFromCSV(csvData)
      }
    }
    reader.readAsText(file)
    
    // Reset file input
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}
</script>