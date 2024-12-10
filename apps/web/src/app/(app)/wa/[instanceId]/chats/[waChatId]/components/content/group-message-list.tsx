'use client'

import { CircleFadingPlus, Loader2 } from 'lucide-react'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Each } from '@/components/utilities/each'
import { useChatParams } from '@/hooks/use-chat-params'
import { useGroupedMessages } from '@/hooks/use-grouped-messages'
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

  const handleFetchNextPage = () => fetchNextPage()

  useEffect(() => {
    onMount()
  }, [onMount])

  return (
    <ChatContentWrapper>
      {hasNextPage && (
        <div className="flex justify-center">
          <Button
            variant="secondary"
            disabled={isFetching}
            onClick={handleFetchNextPage}
          >
            {isFetching ? (
              <Loader2 className="animate-spin" />
            ) : (
              <CircleFadingPlus />
            )}

            {isFetching ? 'Carregando' : 'Carregar mais'}
          </Button>
        </div>
      )}

      <Each
        items={groups}
        render={({ item }) => <GroupMessageItem group={item} />}
      />
    </ChatContentWrapper>
  )
}
