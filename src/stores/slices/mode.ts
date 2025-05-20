import type { StateCreator } from 'zustand'

export type Mode = 'light' | 'dark' | 'system'

export interface ModeSlice {
  mode: Mode
  isLight: boolean
  setMode: (nextMode: Mode) => void
}

// detect if system is currently in dark mode
function isDarkMode(): boolean {
  return (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}

export const createModeSlice: StateCreator<ModeSlice> = (set) => ({
  mode: 'dark',
  isLight: false,

  // if user chooses 'system', detect system theme and set accordingly
  // if user chooses 'dark' or 'light', set the `isLight` accordingly
  // and remove the system listener in the hook
  setMode: (nextMode) => {
    if (nextMode === 'system') {
      set({ mode: 'system', isLight: !isDarkMode() })
    } else if (nextMode === 'dark') {
      set({ mode: 'dark', isLight: false })
    } else {
      set({ mode: 'light', isLight: true })
    }
  },
})
