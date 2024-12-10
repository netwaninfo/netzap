'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Suspense, useCallback, useRef } from 'react'
import { GroupMessagesList } from './group-message-list'
import { GroupMessagesListSkeleton } from './group-message-list-skeleton'

const FETCH_LIMIT = 100

const SKELETON_AMOUNT = Math.floor(FETCH_LIMIT / (Math.random() * 100))

export function PageContent() {
  const areaViewportRef = useRef<HTMLDivElement>(null)

  const handleLoadedMessages = useCallback(() => {
    const areaViewport = areaViewportRef.current
    if (!areaViewport) return

    // https://github.com/radix-ui/primitives/discussions/990
    areaViewport.scrollTo({ top: areaViewport.scrollHeight })
  }, [])

  return (
    <ScrollArea className="h-full" ref={areaViewportRef}>
      <Suspense
        fallback={<GroupMessagesListSkeleton amount={SKELETON_AMOUNT} />}
      >
        <GroupMessagesList onMount={handleLoadedMessages} limit={FETCH_LIMIT} />
      </Suspense>
    </ScrollArea>
  )
}
