import { useCallback, useEffect, useRef, useState } from 'react'

export function useIntersectionObserver<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 1, root: null }
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const elementRef = useRef<T>(null)

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries.at(0)
    if (!entry) return

    setIsIntersecting(entry.isIntersecting)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options)
    if (elementRef.current) observer.observe(elementRef.current)

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current)
      observer.disconnect()
    }
  }, [handleObserver, options])

  return [elementRef, isIntersecting] as const
}
