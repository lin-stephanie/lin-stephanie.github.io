import type { StateCreator } from 'zustand'

type IconType = 'me' | 'home' | 'web' | 'heart'

export interface BloomSlice {
  selectedIcon: IconType | undefined
  setSelectedIcon: (icon: IconType | undefined) => void
}

export const createBloomSlice: StateCreator<BloomSlice> = (set) => ({
  selectedIcon: undefined,
  setSelectedIcon: (icon) => set({ selectedIcon: icon }),
})
