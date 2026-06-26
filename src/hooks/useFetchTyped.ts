import { useState, useEffect } from 'react'

// Generic return type — data can be any shape
interface FetchState<T> {
  data: T | null        // data is T or null (before fetch completes)
  loading: boolean
  error: string | null
}

function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    async function fetchData(): Promise<void> {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }))
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
        const json: T = await res.json()   // cast response to T
        if (!cancelled) setState({ data: json, loading: false, error: null })
      } catch (err) {
        if (!cancelled) setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err.message : 'Unknown error'
          //     ↑ TypeScript forces you to check error type — best practice
        })
      }
    }

    fetchData()
    return () => { cancelled = true }
  }, [url])

  return state
}

export default useFetch

// Usage — TypeScript knows data is APITask[] | null
// const { data, loading, error } = useFetch<APITask[]>(url)