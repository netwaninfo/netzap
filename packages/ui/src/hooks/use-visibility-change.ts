import { useCallback, useEffect, useState } from 'react'

function useVisibilityChange() {
  const [isVisible, setIsVisible] = useState(
    typeof document !== 'undefined'
      ? document.visibilityState === 'visible'
      : false
  )

  const handleVisibilityStateChange = useCallback(() => {
    setIsVisible(document.visibilityState === 'visible')
  }, [])

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityStateChange)

    return () => {
      document.removeEventListener(
        'visibilitychange',
        handleVisibilityStateChange
      )
    }
  }, [handleVisibilityStateChange])

  return isVisible
}

export { useVisibilityChange }
