import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Prize } from '@/types'
import { useSessionsStore } from './sessions'

export const usePrizesStore = defineStore('prizes', () => {
  const sessionsStore = useSessionsStore()

  // Get prizes from active session
  const prizes = computed(() => {
    return sessionsStore.activeSession?.prizes || []
  })

  const availablePrizes = computed(() =>
    prizes.value
      .filter(p => p.remainingQuantity > 0)
      .sort((a, b) => a.order - b.order)
  )

  const totalPrizes = computed(() => prizes.value.length)

  const addPrize = (prize: Omit<Prize, 'id'>) => {
    if (!sessionsStore.activeSession) return
    
    const newPrize: Prize = {
      ...prize,
      id: crypto.randomUUID(),
      remainingQuantity: prize.remainingQuantity || prize.quantity
    }
    
    const updated = [...prizes.value, newPrize]
    sessionsStore.updateSessionData({ prizes: updated })
  }

  const addPrizes = (prizeList: Omit<Prize, 'id'>[]) => {
    if (!sessionsStore.activeSession) return
    
    const newPrizes = prizeList.map(p => ({
      ...p,
      id: crypto.randomUUID(),
      remainingQuantity: p.remainingQuantity || p.quantity
    }))
    
    const updated = [...prizes.value, ...newPrizes]
    sessionsStore.updateSessionData({ prizes: updated })
  }

  const removePrize = (id: string) => {
    if (!sessionsStore.activeSession) return
    
    const updated = prizes.value.filter(p => p.id !== id)
    sessionsStore.updateSessionData({ prizes: updated })
  }

  const updatePrize = (id: string, updates: Partial<Prize>) => {
    if (!sessionsStore.activeSession) return
    
    const updated = prizes.value.map(p => {
      if (p.id !== id) return p
      
      const updatedPrize = { ...p, ...updates }
      
      // Ensure remaining quantity doesn't exceed total quantity
      if (updates.quantity !== undefined) {
        updatedPrize.remainingQuantity = Math.min(
          updatedPrize.remainingQuantity,
          updates.quantity
        )
      }
      
      return updatedPrize
    })
    
    sessionsStore.updateSessionData({ prizes: updated })
  }

  const consumePrize = (id: string) => {
    if (!sessionsStore.activeSession) return false
    
    const prize = prizes.value.find(p => p.id === id)
    if (!prize || prize.remainingQuantity <= 0) return false
    
    const updated = prizes.value.map(p =>
      p.id === id ? { ...p, remainingQuantity: p.remainingQuantity - 1 } : p
    )
    
    sessionsStore.updateSessionData({ prizes: updated })
    return true
  }

  const returnPrize = (id: string) => {
    if (!sessionsStore.activeSession) return false
    
    const prize = prizes.value.find(p => p.id === id)
    if (!prize) return false
    
    // Don't return more than the original quantity
    if (prize.remainingQuantity >= prize.quantity) return false
    
    const updated = prizes.value.map(p =>
      p.id === id ? { ...p, remainingQuantity: p.remainingQuantity + 1 } : p
    )
    
    sessionsStore.updateSessionData({ prizes: updated })
    return true
  }

  const resetAllPrizes = () => {
    if (!sessionsStore.activeSession) return
    
    const updated = prizes.value.map(p => ({
      ...p,
      remainingQuantity: p.quantity
    }))
    
    sessionsStore.updateSessionData({ prizes: updated })
  }

  const clearAllPrizes = () => {
    if (!sessionsStore.activeSession) return
    
    sessionsStore.updateSessionData({ prizes: [] })
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
    returnPrize,
    resetAllPrizes,
    clearAllPrizes,
    getNextAvailablePrize
  }
})