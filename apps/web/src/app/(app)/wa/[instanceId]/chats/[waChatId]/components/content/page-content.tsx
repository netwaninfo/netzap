'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { delay } from '@/utils/delay'
import { Suspense, useCallback, useEffect, useRef } from 'react'
import { useSocketContext } from '../../../../providers/socket-provider'
import { GroupMessagesList } from './group-message-list'
import { GroupMessagesListSkeleton } from './group-message-list-skeleton'

const FETCH_LIMIT = 2

const SKELETON_AMOUNT = Math.floor(FETCH_LIMIT / (Math.random() * 100))

export function PageContent() {
  const { socket } = useSocketContext()

  const areaViewportRef = useRef<HTMLDivElement>(null)

  const scrollToLastMessage = useCallback(() => {
    const areaViewport = areaViewportRef.current
    if (!areaViewport) return

    // https://github.com/radix-ui/primitives/discussions/990
    areaViewport.scrollTo({ top: areaViewport.scrollHeight })
  }, [])

  useEffect(() => {
    socket.on('message:create', async () => {
      await delay(150)
      scrollToLastMessage()
    })

    return () => {
      socket.off('message:create')
    }
  }, [socket, scrollToLastMessage])

  return (
    <ScrollArea className="h-full" ref={areaViewportRef}>
      <Suspense
        fallback={<GroupMessagesListSkeleton amount={SKELETON_AMOUNT} />}
      >
        <GroupMessagesList onMount={scrollToLastMessage} limit={FETCH_LIMIT} />
      </Suspense>
    </ScrollArea>
  )
}
