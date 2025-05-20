import type { StateCreator } from 'zustand'

export interface LoadSlice {
  isLoaded: boolean
  setIsLoaded: (v: boolean) => void
}

export const createLoadSlice: StateCreator<LoadSlice> = (set) => ({
  isLoaded: false,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
})
