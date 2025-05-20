import { triggers, secrets } from '@/configs'

import type { StateCreator } from 'zustand'
import type { Trigger } from '@/configs/toast'

export interface ToastSlice {
  triggers: Trigger[]
  secrets: string[]
  setTriggerStatus: (triggerName: string) => void
  getUnsolvedTriggers: () => Trigger[]
  getRandomHint: () => string
  getRandomSecret: () => string
}

export const createToastSlice: StateCreator<ToastSlice> = (set, get) => ({
  triggers: triggers,
  secrets: secrets,

  setTriggerStatus: (triggerName: string) =>
    set((state) => ({
      triggers: state.triggers.map((t) =>
        t.name === triggerName ? { ...t, triggered: true } : t
      ),
    })),

  getUnsolvedTriggers: () => {
    const state = get()
    return state.triggers.filter((t) => !t.triggered)
  },

  getRandomHint: () => {
    const unsolvedTriggers = get().getUnsolvedTriggers()
    if (unsolvedTriggers.length === 0) return ''
    return unsolvedTriggers[Math.floor(Math.random() * unsolvedTriggers.length)]
      .hint
  },

  getRandomSecret: () => {
    const state = get()
    return state.secrets[Math.floor(Math.random() * state.secrets.length)]
  },
})
