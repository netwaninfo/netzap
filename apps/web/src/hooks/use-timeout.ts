import { useCallback, useEffect, useRef } from 'react'

type UseTimeoutCallback = () => void

function useTimeout(callback: UseTimeoutCallback, ms = 300) {
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  const clearCurrentTimeout = useCallback(() => {
    if (!timeoutId.current) return
    clearTimeout(timeoutId.current)
  }, [])

  useEffect(() => {
    timeoutId.current = setTimeout(callback, ms)

    return () => {
      clearCurrentTimeout()
    }
  }, [clearCurrentTimeout, callback, ms])

  return clearCurrentTimeout
}

export { useTimeout }
