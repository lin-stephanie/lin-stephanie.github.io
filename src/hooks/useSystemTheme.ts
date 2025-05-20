import { useEffect } from 'react'

import { useStore } from '@/stores'

/**
 * If `mode` is set to 'system', it will register a listener on system theme changes.
 * If `mode` is set to 'dark' or 'light', it unsubscribes from that listener.
 */
export const useSystemTheme = () => {
  const { mode, setMode } = useStore()

  useEffect(() => {
    if (mode === 'system') {
      const handleChange = () => {
        setMode('system')
      }

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', handleChange)

      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }
  }, [mode, setMode])
}
