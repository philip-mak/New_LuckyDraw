import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DrawSettings } from '@/types'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<DrawSettings>({
    animationDuration: 3000, // 3 seconds - much faster
    showParticipantInfo: true,
    enableSounds: true,
    allowDuplicateWinners: false,
    theme: 'light',
    cardStyle: 'default'
  })

  const isDrawing = ref(false)
  const drawProgress = ref(0)

  const updateSetting = <K extends keyof DrawSettings>(
    key: K,
    value: DrawSettings[K]
  ) => {
    settings.value[key] = value
  }

  const resetSettings = () => {
    settings.value = {
      animationDuration: 3000,
      showParticipantInfo: true,
      enableSounds: true,
      allowDuplicateWinners: false,
      theme: 'light',
      cardStyle: 'default'
    }
  }

  const startDrawing = () => {
    isDrawing.value = true
    drawProgress.value = 0
  }

  const stopDrawing = () => {
    isDrawing.value = false
    drawProgress.value = 0
  }

  const updateDrawProgress = (progress: number) => {
    drawProgress.value = Math.max(0, Math.min(100, progress))
  }

  return {
    settings,
    isDrawing,
    drawProgress,
    updateSetting,
    resetSettings,
    startDrawing,
    stopDrawing,
    updateDrawProgress
  }
})