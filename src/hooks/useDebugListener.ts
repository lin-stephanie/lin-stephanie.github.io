import { useEffect } from 'react'
import { useBrowserLocation } from 'wouter/use-browser-location'

import { useStore } from '@/stores'

export const useDebugListener = () => {
  const { toggleDebug } = useStore()
  const [location] = useBrowserLocation()

  useEffect(() => {
    const isDebug = location === '/debug'
    toggleDebug(isDebug)
  }, [location, toggleDebug])
}
