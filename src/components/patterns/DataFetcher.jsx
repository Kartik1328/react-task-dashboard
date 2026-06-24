import { useState, useEffect } from 'react'

function DataFetcher({ url, children }) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false
    setState({ data: null, loading: true, error: null })

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((err) => {
        if (!cancelled) setState({ data: null, loading: false, error: err.message })
      })

    return () => { cancelled = true }
  }, [url])

  // children is a function — call it with current state
  // This is the render prop pattern
  return children(state)
}

export default DataFetcher