'use client'

import { useCallback } from 'react'

import { useFetchChats } from '@/hooks/queries/use-fetch-chats'
import { useInstanceParams } from '@/hooks/use-instance-params'

import { Each } from '@netzap/ui/components/utilities/each'
import {
  InfiniteScroll,
  InfiniteScrollTrigger,
} from '@netzap/ui/components/utilities/infinite-scroll'

import { ChatItem } from './chat-item'

interface ChatsListProps {
  limit: number
}

export function ChatsList({ limit }: ChatsListProps) {
  const { instanceId } = useInstanceParams()
  const [chats, { fetchNextPage, hasNextPage }] = useFetchChats({
    params: { instanceId },
    query: { page: 1, limit },
  })

  const handleReachEnd = useCallback(() => {
    if (hasNextPage) fetchNextPage()
  }, [hasNextPage, fetchNextPage])

  return (
    <InfiniteScroll onReachEnd={handleReachEnd}>
      <Each
        items={chats}
        render={item => <ChatItem chat={item} key={item.id} />}
      />

      <InfiniteScrollTrigger />
    </InfiniteScroll>
  )
}
