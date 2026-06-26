import { useState, useEffect } from 'react'

// Generic type T — works with string, number, or any type
// T extends unknown means T can be anything
function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export default useDebounce

// Usage:
// const debouncedSearch = useDebounce<string>(searchInput, 400)
// const debouncedNumber = useDebounce<number>(count, 200)
// TypeScript infers the return type automatically