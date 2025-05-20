import { ReactElement } from 'react'
import toast from 'react-hot-toast/headless'

import { useStore } from '@/stores'

/**
 * Logs content to console only if the global debug state is true.
 */
export const debugLog = (tag: string, ...args: unknown[]) => {
  const { debug } = useStore.getState()

  if (debug) {
    console.log(`[DEBUG] ${tag}:`, ...args)
  }
}

/**
 * Shows a toast containing the provided content.
 */
export const showToast = (content: ReactElement | string, duration = 10000) => {
  const id = 'only'

  if (typeof content === 'string' && content.trim().length === 0) {
    toast.dismiss(id)
    return
  }

  toast.custom(content, { id, duration })
}
