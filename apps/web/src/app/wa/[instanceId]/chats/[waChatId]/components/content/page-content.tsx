'use client'

import { Suspense } from 'react'

import { FETCH_LIMIT } from '@/consts'
import { ScrollArea } from '@netzap/ui/components/scroll-area'

import { usePageContext } from '../../providers/page-provider'
import { DailyMessagesList } from './daily-messages-list'
import { DailyMessagesListSkeleton } from './daily-messages-list-skeleton'

const SKELETON_AMOUNT = Math.floor(FETCH_LIMIT / (Math.random() * 10))

export function PageContent() {
  const { scrollRef } = usePageContext()

  return (
    <ScrollArea className="min-h-0 h-full" ref={scrollRef}>
      <div className="p-4 min-w-96 max-w-screen-lg mx-auto">
        <Suspense
          fallback={<DailyMessagesListSkeleton amount={SKELETON_AMOUNT} />}
        >
          <DailyMessagesList limit={FETCH_LIMIT} />
        </Suspense>
      </div>
    </ScrollArea>
  )
}
