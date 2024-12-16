'use client'

import { MessageCreateServerEventPayload } from '@netzap/websocket/chat'
import { CircleFadingPlus, Loader2 } from 'lucide-react'
import { useCallback, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Each } from '@/components/utilities/each'
import { useFetchMessages } from '@/hooks/queries/use-fetch-messages'
import { useSocketEmitter } from '@/hooks/socket/use-socket-emitter'
import { useSocketEvent } from '@/hooks/socket/use-socket-event'
import { useChatParams } from '@/hooks/use-chat-params'
import { remeda } from '@/lib/remeda'
import { usePageContext } from '../../providers/page-provider'
import { ChatContentWrapper } from '../ui/chat'
import { GroupMessageItem } from './group-message-item'

interface GroupMessagesListProps {
  limit: number
}

export function GroupMessagesList({ limit }: GroupMessagesListProps) {
  const { scrollRef } = usePageContext()
  const { instanceId, waChatId } = useChatParams()

  const handleEmitChatRead = useSocketEmitter('chat:read')

  const [groups, { fetchNextPage, hasNextPage, isFetching }] = useFetchMessages(
    {
      params: { instanceId, waChatId },
      query: { page: 1, limit },
    }
  )

  const handleFetchNextPage = useCallback(
    () => fetchNextPage(),
    [fetchNextPage]
  )

  const handleScrollToLastMessage = useCallback(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    // https://github.com/radix-ui/primitives/discussions/990
    scrollElement.scrollTo({ top: scrollElement.scrollHeight })
    handleEmitChatRead({ waChatId })
  }, [handleEmitChatRead, waChatId])

  useEffect(() => {
    handleScrollToLastMessage()
  }, [])

  const handleMessageCreate = useCallback(
    ({ message }: MessageCreateServerEventPayload) => {
      if (!message.isFromMe) return

      remeda.debounce(handleScrollToLastMessage, { waitMs: 150 }).call()
    },
    []
  )

  useSocketEvent('message:create', handleMessageCreate, [])

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
