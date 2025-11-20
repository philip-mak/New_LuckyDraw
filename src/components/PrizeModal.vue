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
  // Remove BOM if present and trim
  const cleaned = csvData.replace(/^\uFEFF/, '').trim()
  if (!cleaned) {
    alert('❌ CSV 檔案是空的！')
    return
  }

  // Split into lines (handle both \n and \r\n)
  const lines = cleaned.split(/\r?\n/).filter(line => line.trim())
  if (lines.length < 2) {
    alert('❌ CSV 檔案至少需要標題列和一筆資料！')
    return
  }

  // Parse CSV row (handle quoted fields with commas)
  const parseCSVRow = (row: string): string[] => {
    const result: string[] = []
    let current = ''
    let inQuotes = false
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i]
      const nextChar = row[i + 1]
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          current += '"'
          i++
        } else {
          inQuotes = !inQuotes
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    result.push(current.trim())
    return result
  }

  const headerRow = parseCSVRow(lines[0])
  
  // Map headers (support both Chinese and English)
  const headerMap: { [key: string]: number } = {}
  headerRow.forEach((header, index) => {
    const normalized = header.trim().toLowerCase()
    if (normalized === 'title' || normalized === 'name' || normalized === '獎品名稱' || normalized === '奖品名称' || normalized === '名稱' || normalized === '名称') {
      headerMap.title = index
    } else if (normalized === 'description' || normalized === 'desc' || normalized === '描述') {
      headerMap.description = index
    } else if (normalized === 'quantity' || normalized === 'qty' || normalized === '數量' || normalized === '数量') {
      headerMap.quantity = index
    } else if (normalized === 'order' || normalized === '順序' || normalized === '顺序') {
      headerMap.order = index
    }
  })

  // Check if title column exists
  if (headerMap.title === undefined) {
    alert('❌ 找不到「獎品名稱」欄位！\n\n請確認 CSV 檔案包含以下任一標題:\n• 獎品名稱\n• title\n• name')
    return
  }

  const newPrizes: any[] = []
  const startOrder = prizesStore.totalPrizes + 1

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVRow(lines[i])
    
    // Skip empty lines
    if (!values.some(v => v.trim())) continue
    
    const title = values[headerMap.title]?.trim() || ''
    if (!title) continue

    const quantity = headerMap.quantity !== undefined 
      ? parseInt(values[headerMap.quantity] || '1') || 1
      : 1

    const order = headerMap.order !== undefined
      ? parseInt(values[headerMap.order] || String(startOrder + i - 1)) || (startOrder + i - 1)
      : (startOrder + i - 1)

    const prize = {
      title,
      description: headerMap.description !== undefined ? values[headerMap.description]?.trim() || '' : '',
      quantity,
      remainingQuantity: quantity,
      order
    }
    
    newPrizes.push(prize)
  }

  if (newPrizes.length > 0) {
    newPrizes.forEach(prize => prizesStore.addPrize(prize))
    alert(`✅ 成功匯入 ${newPrizes.length} 項獎品！`)
  } else {
    alert('❌ 未找到有效的獎品資料！\n請確認 CSV 格式正確。')
  }
}
</script>