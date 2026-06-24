import { useEffect, useRef } from 'react'

// HOC that logs render count and prop changes
function withLogger(WrappedComponent) {
  // Return a new component
  function WithLogger(props) {
    const renderCount = useRef(0)
    const prevProps = useRef(props)

    useEffect(() => {
      renderCount.current += 1

      // Find which props changed
      const changedProps = Object.keys(props).filter(
        (key) => props[key] !== prevProps.current[key]
      )

      if (renderCount.current > 1 && changedProps.length > 0) {
        console.log(
          `[withLogger] ${WrappedComponent.displayName || WrappedComponent.name} ` +
          `re-rendered (#${renderCount.current}) — changed props: ${changedProps.join(', ')}`
        )
      }

      prevProps.current = props
    })

    return (
      <div className="relative">
        {/* Debug badge — only visible in dev */}
        {import.meta.env.DEV && (
          <div className="absolute -top-2 -right-2 z-10 bg-orange-500 text-white
            text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {renderCount.current}
          </div>
        )}
        <WrappedComponent {...props} />
      </div>
    )
  }

  // Set display name for React DevTools
  WithLogger.displayName = `withLogger(${WrappedComponent.displayName || WrappedComponent.name})`

  return WithLogger
}

export default withLogger