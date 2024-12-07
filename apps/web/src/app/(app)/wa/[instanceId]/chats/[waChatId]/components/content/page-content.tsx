'use client'

import { ScrollArea, ScrollAreaViewport } from '@/components/ui/scroll-area'
import { Suspense, useEffect, useRef } from 'react'
import { ChatContentWrapper } from '../ui/chat'
import { GroupMessagesList } from './group-message-list'

export function PageContent() {
  const areaViewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // https://github.com/radix-ui/primitives/discussions/990
    const areaViewport = areaViewportRef.current
    if (areaViewport) {
      areaViewport.scrollTo({ top: areaViewport.scrollHeight })
    }
  }, [])

  return (
    <ScrollArea className="h-full">
      <ScrollAreaViewport ref={areaViewportRef}>
        <ChatContentWrapper>
          <Suspense fallback="Loading...">
            <GroupMessagesList />
          </Suspense>
        </ChatContentWrapper>
      </ScrollAreaViewport>
    </ScrollArea>
  )
}
