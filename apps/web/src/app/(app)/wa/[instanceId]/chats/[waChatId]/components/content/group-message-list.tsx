'use client'

import { Each } from '@/components/utilities/each'
import { useChatParams } from '@/hooks/use-chat-params'
import { useGroupedMessages } from '@/hooks/use-grouped-messages'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import { useEffect } from 'react'
import { ChatContentWrapper } from '../ui/chat'
import { GroupMessageItem } from './group-message-item'

interface GroupMessagesListProps {
  onMount: () => void
  limit: number
}

export function GroupMessagesList({ onMount, limit }: GroupMessagesListProps) {
  const { instanceId, waChatId } = useChatParams()

  const [groups, { fetchNextPage, hasNextPage, isFetching }] =
    useGroupedMessages({
      params: { instanceId, waChatId },
      query: { page: 1, limit },
    })

  const [triggerRef, entry] = useIntersectionObserver({
    threshold: 0,
  })

  const isCanFetchNextPage =
    !!entry?.isIntersecting && hasNextPage && !isFetching

  useEffect(() => {
    if (isCanFetchNextPage) fetchNextPage()
  }, [isCanFetchNextPage, fetchNextPage])

  useEffect(() => {
    onMount()
  }, [onMount])

  return (
    <ChatContentWrapper>
      <Each
        items={groups}
        render={({ item }) => <GroupMessageItem group={item} />}
      />

      <span ref={triggerRef} />
    </ChatContentWrapper>
  )
}
