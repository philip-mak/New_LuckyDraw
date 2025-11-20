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
            // Escaped quote
            current += '"'
            i++
          } else {
            // Toggle quote state
            inQuotes = !inQuotes
          }
        } else if (char === ',' && !inQuotes) {
          // Field separator
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
      if (normalized === 'name' || normalized === 'names' || normalized === '姓名') {
        headerMap.name = index
      } else if (normalized === 'email' || normalized === 'emails' || normalized === '電子郵件' || normalized === '电子邮件') {
        headerMap.email = index
      } else if (normalized === 'position' || normalized === 'job' || normalized === 'title' || normalized === '職位' || normalized === '职位' || normalized === '職稱' || normalized === '职称') {
        headerMap.position = index
      } else if (normalized === 'group' || normalized === 'department' || normalized === 'team' || normalized === '群組' || normalized === '群组' || normalized === '部門' || normalized === '部门') {
        headerMap.group = index
      }
    })

    // Check if name column exists
    if (headerMap.name === undefined) {
      alert('❌ 找不到「姓名」欄位！\n\n請確認 CSV 檔案包含以下任一標題:\n• 姓名\n• name\n• names')
      return
    }
    
    const newParticipants: Omit<Participant, 'id'>[] = []
    
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVRow(lines[i])
      
      // Skip empty lines
      if (!values.some(v => v.trim())) continue
      
      const name = values[headerMap.name]?.trim() || ''
      if (!name) continue
      
      const participant: Omit<Participant, 'id'> = {
        name,
        email: headerMap.email !== undefined ? values[headerMap.email]?.trim() || '' : '',
        position: headerMap.position !== undefined ? values[headerMap.position]?.trim() || '' : '',
        group: headerMap.group !== undefined ? values[headerMap.group]?.trim() || '' : ''
      }
      
      newParticipants.push(participant)
    }
    
    if (newParticipants.length > 0) {
      addParticipants(newParticipants)
      alert(`✅ 成功匯入 ${newParticipants.length} 位參與者！`)
    } else {
      alert('❌ 未找到有效的參與者資料！\n請確認 CSV 格式正確。')
    }
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