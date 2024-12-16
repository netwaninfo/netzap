'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Suspense } from 'react'
import { usePageContext } from '../../providers/page-provider'
import { GroupMessagesList } from './group-message-list'
import { GroupMessagesListSkeleton } from './group-message-list-skeleton'

const FETCH_LIMIT = 100

const SKELETON_AMOUNT = Math.floor(FETCH_LIMIT / (Math.random() * 10))

export function PageContent() {
  const { scrollRef } = usePageContext()

  return (
    <ScrollArea className="h-full" ref={scrollRef}>
      <Suspense
        fallback={<GroupMessagesListSkeleton amount={SKELETON_AMOUNT} />}
      >
        <GroupMessagesList limit={FETCH_LIMIT} />
      </Suspense>
    </ScrollArea>
  )
}
