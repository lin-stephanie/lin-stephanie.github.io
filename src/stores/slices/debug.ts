import type { StateCreator } from 'zustand'

export interface DebugSlice {
  debug: boolean
  toggleDebug: (v: boolean) => void
}

export const createDebugSlice: StateCreator<DebugSlice> = (set) => ({
  debug: false,

  toggleDebug: (v: boolean) =>
    set((state) => ({ debug: typeof v === 'boolean' ? v : !state.debug })),
  // toggleDebug: (v: boolean) => set({ debug: v }),
  // toggleDebug: (v: boolean) => set(() => ({ debug: v })),
})
