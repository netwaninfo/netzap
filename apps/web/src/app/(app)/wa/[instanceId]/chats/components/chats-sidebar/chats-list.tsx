'use client'

import { useIntersectionObserver } from '@uidotdev/usehooks'
import { useEffect } from 'react'

import { Each } from '@/components/utilities/each'
import { useFetchChats } from '@/hooks/queries/use-fetch-chats'
import { useInstanceParams } from '@/hooks/use-instance-params'
import { ChatItem } from '../chats/chat-item'
import { ChatListWrapper } from './chat-list-wrapper'

interface ChatsListProps {
  limit: number
}

export function ChatsList({ limit }: ChatsListProps) {
  const { instanceId } = useInstanceParams()
  const [chats, { fetchNextPage, hasNextPage }] = useFetchChats({
    params: { instanceId },
    query: { page: 1, limit },
  })

  const [triggerRef, entry] = useIntersectionObserver({
    threshold: 1,
  })

  const isCanFetchNextPage = entry?.isIntersecting && hasNextPage

  useEffect(() => {
    if (isCanFetchNextPage) fetchNextPage()
  }, [isCanFetchNextPage, fetchNextPage])

  return (
    <ChatListWrapper>
      <Each items={chats} render={({ item }) => <ChatItem chat={item} />} />

      <span ref={triggerRef} />
    </ChatListWrapper>
  )
}
