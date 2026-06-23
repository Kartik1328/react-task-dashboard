import { useState, useEffect, useRef } from 'react'

export function useThrottle(value, interval = 300) {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastUpdated = useRef(null)  // stores timestamp of last update

  useEffect(() => {
    const now = Date.now()

    if (lastUpdated.current === null || now - lastUpdated.current >= interval) {
      // Enough time has passed — update immediately
      lastUpdated.current = now
      setThrottledValue(value)
    } else {
      // Too soon — schedule update for when interval completes
      const remaining = interval - (now - lastUpdated.current)
      const timer = setTimeout(() => {
        lastUpdated.current = Date.now()
        setThrottledValue(value)
      }, remaining)

      return () => clearTimeout(timer)
    }
  }, [value, interval])

  return throttledValue
}