import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Participant } from '@/types'

const STORAGE_KEY = 'lucky-draw-participants'

export const useParticipantsStore = defineStore('participants', () => {
  const participants = ref<Participant[]>([])
  const selectedParticipant = ref<Participant | null>(null)

  // Load from localStorage on init
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        participants.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to load participants from localStorage:', error)
    }
  }

  // Save to localStorage whenever participants change
  watch(participants, (newValue) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue))
    } catch (error) {
      console.error('Failed to save participants to localStorage:', error)
    }
  }, { deep: true })

  // Initialize from storage
  loadFromStorage()

  const activeParticipants = computed(() =>
    participants.value.filter(p => !p.isWinner)
  )

  const winners = computed(() =>
    participants.value.filter(p => p.isWinner)
  )

  const totalParticipants = computed(() => participants.value.length)

  const addParticipant = (participant: Omit<Participant, 'id'>) => {
    const newParticipant: Participant = {
      ...participant,
      id: crypto.randomUUID(),
      isSelected: false,
      isWinner: false
    }
    participants.value.push(newParticipant)
  }

  const addParticipants = (participantList: Omit<Participant, 'id'>[]) => {
    participantList.forEach(participant => addParticipant(participant))
  }

  const removeParticipant = (id: string) => {
    const index = participants.value.findIndex(p => p.id === id)
    if (index > -1) {
      participants.value.splice(index, 1)
    }
  }

  const updateParticipant = (id: string, updates: Partial<Participant>) => {
    const participant = participants.value.find(p => p.id === id)
    if (participant) {
      Object.assign(participant, updates)
    }
  }

  const selectParticipant = (id: string) => {
    // Clear previous selection
    participants.value.forEach(p => p.isSelected = false)
    
    // Select new participant
    const participant = participants.value.find(p => p.id === id)
    if (participant) {
      participant.isSelected = true
      selectedParticipant.value = participant
    }
  }

  const markAsWinner = (id: string, prize?: string) => {
    const participant = participants.value.find(p => p.id === id)
    if (participant) {
      participant.isWinner = true
      participant.prizeWon = prize
      participant.drawOrder = winners.value.length
      selectedParticipant.value = null
    }
  }

  const clearSelection = () => {
    participants.value.forEach(p => p.isSelected = false)
    selectedParticipant.value = null
  }

  const resetAllWinners = () => {
    participants.value.forEach(p => {
      p.isWinner = false
      p.prizeWon = undefined
      p.drawOrder = undefined
    })
  }

  const clearAllParticipants = () => {
    participants.value = []
    selectedParticipant.value = null
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