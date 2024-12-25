'use client'

import { useComposedRefs } from '@radix-ui/react-compose-refs'
import { Slot } from '@radix-ui/react-slot'
import React, {
  Children,
  createContext,
  type ReactElement,
  useContext,
  useEffect,
} from 'react'

import { useIntersectionObserver } from '@netzap/ui/hooks/use-intersection-observer'

interface InfiniteScrollContextValue {
  onReachEnd: () => Promise<void> | void
}

const InfiniteScrollContext = createContext({} as InfiniteScrollContextValue)

const useInfiniteScroll = () => useContext(InfiniteScrollContext)

interface InfiniteScrollProps {
  children: [React.ReactNode, ReactElement<typeof InfiniteScrollTrigger>]
  onReachEnd: () => Promise<void> | void
}

function InfiniteScroll({ children, onReachEnd }: InfiniteScrollProps) {
  return (
    <InfiniteScrollContext.Provider value={{ onReachEnd }}>
      {Children.toArray(children)}
    </InfiniteScrollContext.Provider>
  )
}

type InfiniteScrollTriggerRef = HTMLElement
interface InfiniteScrollTriggerProps extends IntersectionObserverInit {
  asChild?: boolean
}

const InfiniteScrollTrigger = React.forwardRef<
  InfiniteScrollTriggerRef,
  InfiniteScrollTriggerProps
>(({ asChild, ...options }, ref) => {
  const { onReachEnd } = useInfiniteScroll()

  const [triggerRef, isIntersecting] = useIntersectionObserver(options)
  const composedRef = useComposedRefs(triggerRef, ref)

  useEffect(() => {
    if (isIntersecting) onReachEnd()
  }, [isIntersecting, onReachEnd])

  const Comp = asChild ? Slot : 'span'

  return <Comp ref={composedRef} />
})

export { InfiniteScroll, InfiniteScrollTrigger }
