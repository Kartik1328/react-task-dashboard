import { useState, useEffect } from 'react'

// value = the thing to debounce (search input string)
// delay = how long to wait after last change (ms)
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Start a timer — if value changes before timer fires, timer resets
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup — this runs BEFORE the next effect
    // So if value changes within 300ms, previous timer is cleared
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}   