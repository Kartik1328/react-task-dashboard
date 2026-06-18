import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    let cancelled = false   // cleanup flag

    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
        const json = await res.json()
        if (!cancelled) setData(json)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()

    return () => { cancelled = true }   // cleanup on unmount
  }, [url])

  return { data, loading, error }
}