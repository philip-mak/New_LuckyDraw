import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Participant, Prize } from '@/types'

export interface DrawSession {
  id: string
  name: string
  color: string // For visual identification
  createdAt: string
  lastModified: string
  // Session-specific data
  participants: Participant[]
  prizes: Prize[]
  winners: Participant[]
}

const STORAGE_KEY = 'lucky-draw-sessions'
const ACTIVE_SESSION_KEY = 'lucky-draw-active-session'

export const useSessionsStore = defineStore('sessions', () => {
  // State
  const sessions = ref<DrawSession[]>([])
  const activeSessionId = ref<string | null>(null)

  // Computed
  const activeSession = computed(() => {
    if (!activeSessionId.value) return null
    return sessions.value.find(s => s.id === activeSessionId.value) || null
  })

  const sessionsList = computed(() => {
    return sessions.value.map(s => ({
      id: s.id,
      name: s.name,
      color: s.color,
      participantsCount: s.participants.length,
      winnersCount: s.winners.length,
      prizesCount: s.prizes.reduce((sum, p) => sum + p.totalQuantity, 0),
      prizesRemaining: s.prizes.reduce((sum, p) => sum + p.remainingQuantity, 0),
      progress: s.prizes.reduce((sum, p) => sum + p.totalQuantity, 0) > 0
        ? Math.round((s.prizes.reduce((sum, p) => sum + (p.totalQuantity - p.remainingQuantity), 0) / s.prizes.reduce((sum, p) => sum + p.totalQuantity, 0)) * 100)
        : 0
    }))
  })

  // Actions
  const createSession = (name: string, color: string = '#3b82f6') => {
    const newSession: DrawSession = {
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      color,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      participants: [],
      prizes: [],
      winners: []
    }
    sessions.value.push(newSession)
    
    // Set as active if it's the first session
    if (sessions.value.length === 1) {
      activeSessionId.value = newSession.id
    }
    
    saveToLocalStorage()
    return newSession
  }

  const deleteSession = (sessionId: string) => {
    const index = sessions.value.findIndex(s => s.id === sessionId)
    if (index === -1) return

    sessions.value.splice(index, 1)
    
    // If deleted session was active, switch to first available session
    if (activeSessionId.value === sessionId) {
      activeSessionId.value = sessions.value.length > 0 ? sessions.value[0].id : null
    }
    
    saveToLocalStorage()
  }

  const updateSession = (sessionId: string, updates: Partial<Omit<DrawSession, 'id' | 'createdAt'>>) => {
    const session = sessions.value.find(s => s.id === sessionId)
    if (!session) return

    Object.assign(session, {
      ...updates,
      lastModified: new Date().toISOString()
    })
    
    saveToLocalStorage()
  }

  const setActiveSession = (sessionId: string) => {
    const session = sessions.value.find(s => s.id === sessionId)
    if (session) {
      activeSessionId.value = sessionId
      localStorage.setItem(ACTIVE_SESSION_KEY, sessionId)
    }
  }

  const updateSessionData = (updates: Partial<Pick<DrawSession, 'participants' | 'prizes' | 'winners'>>) => {
    if (!activeSession.value) return

    Object.assign(activeSession.value, {
      ...updates,
      lastModified: new Date().toISOString()
    })
    
    saveToLocalStorage()
  }

  // Persistence
  const saveToLocalStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions.value))
      if (activeSessionId.value) {
        localStorage.setItem(ACTIVE_SESSION_KEY, activeSessionId.value)
      }
    } catch (error) {
      console.error('Failed to save sessions to localStorage:', error)
    }
  }

  const loadFromLocalStorage = () => {
    try {
      const savedSessions = localStorage.getItem(STORAGE_KEY)
      const savedActiveId = localStorage.getItem(ACTIVE_SESSION_KEY)
      
      if (savedSessions) {
        sessions.value = JSON.parse(savedSessions)
      }
      
      if (savedActiveId && sessions.value.find(s => s.id === savedActiveId)) {
        activeSessionId.value = savedActiveId
      } else if (sessions.value.length > 0) {
        activeSessionId.value = sessions.value[0].id
      }
      
      // Create default session if none exists
      if (sessions.value.length === 0) {
        createSession('預設抽獎', '#3b82f6')
      }
    } catch (error) {
      console.error('Failed to load sessions from localStorage:', error)
      // Create default session on error
      createSession('預設抽獎', '#3b82f6')
    }
  }

  const exportSession = (sessionId: string) => {
    const session = sessions.value.find(s => s.id === sessionId)
    if (!session) return null

    return {
      name: session.name,
      exportDate: new Date().toISOString(),
      participants: session.participants,
      prizes: session.prizes,
      winners: session.winners
    }
  }

  const importSession = (name: string, data: any, color: string = '#3b82f6') => {
    const newSession = createSession(name, color)
    
    updateSession(newSession.id, {
      participants: data.participants || [],
      prizes: data.prizes || [],
      winners: data.winners || []
    })
    
    return newSession
  }

  // Auto-save on changes
  watch(sessions, () => {
    saveToLocalStorage()
  }, { deep: true })

  // Initialize
  loadFromLocalStorage()

  return {
    // State
    sessions,
    activeSessionId,
    
    // Computed
    activeSession,
    sessionsList,
    
    // Actions
    createSession,
    deleteSession,
    updateSession,
    setActiveSession,
    updateSessionData,
    exportSession,
    importSession,
    saveToLocalStorage,
    loadFromLocalStorage
  }
})
