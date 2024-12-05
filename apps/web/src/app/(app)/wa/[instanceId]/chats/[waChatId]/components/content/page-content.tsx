'use client'

import { ScrollArea, ScrollAreaViewport } from '@/components/ui/scroll-area'
import { Suspense, useEffect, useRef } from 'react'
import { ChatContentWrapper } from '../ui/chat'
import { GroupMessagesList } from './group-message-list'

export function PageContent() {
  const scrollViewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // https://github.com/radix-ui/primitives/discussions/990
    const scrollViewport = scrollViewportRef.current
    if (scrollViewport) {
      scrollViewport.scrollTo({ top: scrollViewport.scrollHeight })
    }
  }, [])

  return (
    <ScrollArea className="h-full">
      <ScrollAreaViewport ref={scrollViewportRef}>
        <ChatContentWrapper>
          <Suspense fallback="Loading...">
            <GroupMessagesList />
          </Suspense>
        </ChatContentWrapper>
      </ScrollAreaViewport>
    </ScrollArea>
  )
}
