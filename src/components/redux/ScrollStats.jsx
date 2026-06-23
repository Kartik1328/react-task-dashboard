import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectTaskStats } from '../../store/selectors'
import { useThrottle } from '../../hooks/useThrottle'

function ScrollStats() {
  const stats = useSelector(selectTaskStats)
  const [scrollY, setScrollY] = useState(0)

  // Raw scroll position — updates on every scroll event (hundreds per second)
  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Throttled value — updates maximum once per 500ms
  const throttledScrollY = useThrottle(scrollY, 500)

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 mb-4">
      <p className="text-xs font-medium text-gray-500 mb-3">
        Throttle demo — scroll the page to see difference
      </p>
      <div className="flex gap-6">
        <div>
          <p className="text-xs text-gray-400">Raw scroll (every event)</p>
          <p className="text-lg font-bold text-red-500">{scrollY}px</p>
        </div>
        <div className="w-px bg-gray-100"></div>
        <div>
          <p className="text-xs text-gray-400">Throttled (max once/500ms)</p>
          <p className="text-lg font-bold text-green-600">{throttledScrollY}px</p>
        </div>
        <div className="w-px bg-gray-100"></div>
        <div>
          <p className="text-xs text-gray-400">Tasks found</p>
          <p className="text-lg font-bold text-purple-600">{stats.total}</p>
        </div>
      </div>
    </div>
  )
}

export default ScrollStats