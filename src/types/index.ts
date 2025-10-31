export interface Participant {
  id: string
  name: string
  email?: string
  position?: string
  group?: string
  isSelected?: boolean
  isWinner?: boolean
  prizeWon?: string
  drawOrder?: number
}

export interface Prize {
  id: string
  title: string
  description?: string
  quantity: number
  remainingQuantity: number
  order: number
}

export interface DrawSettings {
  animationDuration: number
  showParticipantInfo: boolean
  enableSounds: boolean
  allowDuplicateWinners: boolean
  theme: 'light' | 'dark'
  cardStyle: 'default' | 'compact' | 'detailed'
}

export interface DrawResult {
  id: string
  participantId: string
  prizeId: string
  timestamp: Date
  drawSession: string
}