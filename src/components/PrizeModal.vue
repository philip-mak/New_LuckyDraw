<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900">新增獎品</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="space-y-6">
        <!-- Single Prize Form -->
        <div>
          <h4 class="font-medium text-gray-900 mb-3">新增單一獎品</h4>
          <form @submit.prevent="addSinglePrize" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            獎品名稱 *
          </label>
          <input
            v-model="prizeForm.title"
            type="text"
            required
            placeholder="例如: 第一名獎盃"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            描述 (選填)
          </label>
          <textarea
            v-model="prizeForm.description"
            rows="3"
            placeholder="描述獎品..."
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            數量 *
          </label>
          <input
            v-model.number="prizeForm.quantity"
            type="number"
            min="1"
            required
            placeholder="這個獎品有幾個？"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            抽獎順序
          </label>
          <input
            v-model.number="prizeForm.order"
            type="number"
            min="1"
            placeholder="此獎品應被抽中的順序 (1 = 第一個)"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

            <div class="flex gap-3 pt-4">
              <button type="button" @click="clearForm" class="btn-secondary flex-1">
                清除
              </button>
              <button 
                type="submit" 
                :disabled="!prizeForm.title.trim() || prizeForm.quantity < 1"
                class="btn-primary flex-1"
                :class="{ 'opacity-50 cursor-not-allowed': !prizeForm.title.trim() || prizeForm.quantity < 1 }"
              >
                新增獎品
              </button>
            </div>
          </form>
        </div>

        <!-- CSV Import Section -->
        <div class="border-t pt-4">
          <h4 class="font-medium text-gray-900 mb-3">從 CSV 匯入獎品</h4>
          <div class="space-y-3">
            <div class="text-sm text-gray-600">
              上傳包含以下欄位的 CSV 檔案: 獎品名稱, 描述, 數量, 順序
            </div>
            <input
              ref="csvFileInput"
              type="file"
              accept=".csv"
              @change="handleCSVUpload"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
            <div class="text-xs text-gray-500">
              CSV 格式範例:<br/>
              獎品名稱,描述,數量,順序<br/>
              第一名獎盃,金色獎盃,1,1<br/>
              第二名獎牌,銀色獎牌,1,2<br/>
              參加獎,精美禮品,10,3
            </div>
          </div>
        </div>

        <!-- Bulk Add Section -->
        <div class="border-t pt-4">
          <h4 class="font-medium text-gray-900 mb-3">批量新增獎品 (一行一個)</h4>
          <textarea
            v-model="bulkPrizes"
            placeholder="請輸入獎品名稱，一行一個...&#10;例如:&#10;第一名獎盃&#10;第二名獎牌&#10;參加獎"
            rows="4"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
          <button 
            @click="addBulkPrizes"
            :disabled="!bulkPrizes.trim()"
            class="btn-secondary w-full mt-2"
            :class="{ 'opacity-50 cursor-not-allowed': !bulkPrizes.trim() }"
          >
            新增所有獎品
          </button>
        </div>

        <!-- Close Button -->
        <div class="border-t pt-4">
          <button @click="$emit('close')" class="btn-secondary w-full">
            關閉
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePrizesStore } from '@/stores/prizes'

const prizesStore = usePrizesStore()

defineEmits<{
  close: []
}>()

const prizeForm = ref({
  title: '',
  description: '',
  quantity: 1,
  order: prizesStore.totalPrizes + 1
})

const bulkPrizes = ref('')
const csvFileInput = ref<HTMLInputElement | null>(null)

const addSinglePrize = () => {
  if (prizeForm.value.title.trim() && prizeForm.value.quantity > 0) {
    prizesStore.addPrize({
      title: prizeForm.value.title.trim(),
      description: prizeForm.value.description.trim() || undefined,
      quantity: prizeForm.value.quantity,
      remainingQuantity: prizeForm.value.quantity,
      order: prizeForm.value.order
    })
    
    clearForm()
  }
}

const clearForm = () => {
  prizeForm.value = {
    title: '',
    description: '',
    quantity: 1,
    order: prizesStore.totalPrizes + 1
  }
}

const addBulkPrizes = () => {
  const prizeNames = bulkPrizes.value
    .split('\n')
    .map(name => name.trim())
    .filter(name => name.length > 0)
  
  prizeNames.forEach((name, index) => {
    prizesStore.addPrize({
      title: name,
      description: '',
      quantity: 1,
      remainingQuantity: 1,
      order: prizesStore.totalPrizes + index + 1
    })
  })
  
  bulkPrizes.value = ''
}

const handleCSVUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file && file.type === 'text/csv') {
    const reader = new FileReader()
    reader.onload = (e) => {
      const csvData = e.target?.result as string
      if (csvData) {
        importPrizesFromCSV(csvData)
      }
    }
    reader.readAsText(file)
    
    // Reset file input
    if (csvFileInput.value) {
      csvFileInput.value.value = ''
    }
  }
}

const importPrizesFromCSV = (csvData: string) => {
  try {
    const lines = csvData.trim().split('\n')
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim())
      const prize = {
        title: '',
        description: '',
        quantity: 1,
        remainingQuantity: 1,
        order: prizesStore.totalPrizes + i
      }
      
      headers.forEach((header, index) => {
        if (values[index]) {
          switch (header) {
            case '獎品名稱':
            case 'title':
            case 'name':
              prize.title = values[index]
              break
            case '描述':
            case 'description':
            case 'desc':
              prize.description = values[index]
              break
            case '數量':
            case 'quantity':
            case 'qty':
              const qty = parseInt(values[index])
              if (!isNaN(qty) && qty > 0) {
                prize.quantity = qty
                prize.remainingQuantity = qty
              }
              break
            case '順序':
            case 'order':
              const order = parseInt(values[index])
              if (!isNaN(order) && order > 0) {
                prize.order = order
              }
              break
          }
        }
      })
      
      if (prize.title) {
        prizesStore.addPrize(prize)
      }
    }
    
    alert('獎品 CSV 匯入成功！')
  } catch (error) {
    alert('匯入獎品時發生錯誤，請檢查 CSV 檔案格式。')
  }
}
</script>