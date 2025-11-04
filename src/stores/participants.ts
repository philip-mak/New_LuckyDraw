import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Participant } from '@/types'
import { useSessionsStore } from './sessions'

export const useParticipantsStore = defineStore('participants', () => {
  const sessionsStore = useSessionsStore()
  const selectedParticipant = ref<Participant | null>(null)

  // Get participants from active session
  const participants = computed(() => {
    return sessionsStore.activeSession?.participants || []
  })

  // Sync changes back to session
  const syncToSession = () => {
    if (sessionsStore.activeSession) {
      sessionsStore.updateSessionData({
        participants: participants.value
      })
    }
  }

  const activeParticipants = computed(() =>
    participants.value.filter(p => !p.isWinner)
  )

  const winners = computed(() =>
    participants.value.filter(p => p.isWinner)
  )

  const totalParticipants = computed(() => participants.value.length)

  const addParticipant = (participant: Omit<Participant, 'id'>) => {
    if (!sessionsStore.activeSession) return
    
    const newParticipant: Participant = {
      ...participant,
      id: crypto.randomUUID(),
      isSelected: false,
      isWinner: false
    }
    
    const updated = [...participants.value, newParticipant]
    sessionsStore.updateSessionData({ participants: updated })
  }

  const addParticipants = (participantList: Omit<Participant, 'id'>[]) => {
    if (!sessionsStore.activeSession) return
    
    const newParticipants = participantList.map(p => ({
      ...p,
      id: crypto.randomUUID(),
      isSelected: false,
      isWinner: false
    }))
    
    const updated = [...participants.value, ...newParticipants]
    sessionsStore.updateSessionData({ participants: updated })
  }

  const removeParticipant = (id: string) => {
    if (!sessionsStore.activeSession) return
    
    const updated = participants.value.filter(p => p.id !== id)
    sessionsStore.updateSessionData({ participants: updated })
  }

  const updateParticipant = (id: string, updates: Partial<Participant>) => {
    if (!sessionsStore.activeSession) return
    
    const updated = participants.value.map(p =>
      p.id === id ? { ...p, ...updates } : p
    )
    sessionsStore.updateSessionData({ participants: updated })
  }

  const selectParticipant = (id: string) => {
    if (!sessionsStore.activeSession) return
    
    const updated = participants.value.map(p => ({
      ...p,
      isSelected: p.id === id
    }))
    
    const participant = updated.find(p => p.id === id)
    if (participant) {
      selectedParticipant.value = participant
    }
    
    sessionsStore.updateSessionData({ participants: updated })
  }

  const markAsWinner = (id: string, prize?: string) => {
    if (!sessionsStore.activeSession) return
    
    const currentWinners = winners.value
    const updated = participants.value.map(p =>
      p.id === id
        ? { ...p, isWinner: true, prizeWon: prize, drawOrder: currentWinners.length }
        : p
    )
    
    selectedParticipant.value = null
    sessionsStore.updateSessionData({ participants: updated })
  }

  const clearSelection = () => {
    if (!sessionsStore.activeSession) return
    
    const updated = participants.value.map(p => ({
      ...p,
      isSelected: false
    }))
    
    selectedParticipant.value = null
    sessionsStore.updateSessionData({ participants: updated })
  }

  const resetAllWinners = () => {
    if (!sessionsStore.activeSession) return
    
    const updated = participants.value.map(p => ({
      ...p,
      isWinner: false,
      prizeWon: undefined,
      drawOrder: undefined
    }))
    
    sessionsStore.updateSessionData({ participants: updated })
  }

  const clearAllParticipants = () => {
    if (!sessionsStore.activeSession) return
    
    selectedParticipant.value = null
    sessionsStore.updateSessionData({ participants: [] })
  }

  const importFromCSV = (csvData: string) => {
    const lines = csvData.trim().split('\n')
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
    
    const newParticipants: Omit<Participant, 'id'>[] = []
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim())
      const participant: Omit<Participant, 'id'> = {
        name: '',
        email: '',
        position: '',
        group: ''
      }
      
      headers.forEach((header, index) => {
        if (values[index]) {
          switch (header) {
            case 'name':
            case 'names':
              participant.name = values[index]
              break
            case 'email':
            case 'emails':
              participant.email = values[index]
              break
            case 'position':
            case 'job':
            case 'title':
              participant.position = values[index]
              break
            case 'group':
            case 'department':
            case 'team':
              participant.group = values[index]
              break
          }
        }
      })
      
      if (participant.name) {
        newParticipants.push(participant)
      }
    }
    
    addParticipants(newParticipants)
  }

  return {
    participants,
    selectedParticipant,
    activeParticipants,
    winners,
    totalParticipants,
    addParticipant,
    addParticipants,
    removeParticipant,
    updateParticipant,
    selectParticipant,
    markAsWinner,
    clearSelection,
    resetAllWinners,
    clearAllParticipants,
    importFromCSV
  }
})