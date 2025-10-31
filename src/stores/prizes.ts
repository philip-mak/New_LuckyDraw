import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Prize } from '@/types'

export const usePrizesStore = defineStore('prizes', () => {
  const prizes = ref<Prize[]>([])

  const availablePrizes = computed(() =>
    prizes.value.filter(p => p.remainingQuantity > 0)
  )

  const totalPrizes = computed(() => prizes.value.length)

  const addPrize = (prize: Omit<Prize, 'id'>) => {
    const newPrize: Prize = {
      ...prize,
      id: crypto.randomUUID(),
      remainingQuantity: prize.remainingQuantity || prize.quantity
    }
    prizes.value.push(newPrize)
  }

  const addPrizes = (prizeList: Omit<Prize, 'id'>[]) => {
    prizeList.forEach(prize => addPrize(prize))
  }

  const removePrize = (id: string) => {
    const index = prizes.value.findIndex(p => p.id === id)
    if (index > -1) {
      prizes.value.splice(index, 1)
    }
  }

  const updatePrize = (id: string, updates: Partial<Prize>) => {
    const prize = prizes.value.find(p => p.id === id)
    if (prize) {
      const updatedPrize = { ...prize, ...updates }
      
      // Ensure remaining quantity doesn't exceed total quantity
      if (updates.quantity !== undefined) {
        updatedPrize.remainingQuantity = Math.min(
          updatedPrize.remainingQuantity,
          updates.quantity
        )
      }
      
      const index = prizes.value.findIndex(p => p.id === id)
      prizes.value[index] = updatedPrize
    }
  }

  const consumePrize = (id: string) => {
    const prize = prizes.value.find(p => p.id === id)
    if (prize && prize.remainingQuantity > 0) {
      prize.remainingQuantity -= 1
      return true
    }
    return false
  }

  const resetAllPrizes = () => {
    prizes.value.forEach(prize => {
      prize.remainingQuantity = prize.quantity
    })
  }

  const clearAllPrizes = () => {
    prizes.value = []
  }

  const getNextAvailablePrize = (): Prize | null => {
    return availablePrizes.value
      .sort((a, b) => a.order - b.order)[0] || null
  }

  return {
    prizes,
    availablePrizes,
    totalPrizes,
    addPrize,
    addPrizes,
    removePrize,
    updatePrize,
    consumePrize,
    resetAllPrizes,
    clearAllPrizes,
    getNextAvailablePrize
  }
})