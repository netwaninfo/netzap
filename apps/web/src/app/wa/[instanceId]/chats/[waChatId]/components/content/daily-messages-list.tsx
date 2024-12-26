'use client'

import type { MessageCreateServerEventPayload } from '@netzap/websocket/chat'
import { CircleFadingPlus, Loader2 } from 'lucide-react'
import { useCallback, useEffect } from 'react'

import { useFetchDailyMessages } from '@/hooks/queries/use-fetch-daily-messages'
import { useChatParams } from '@/hooks/use-chat-params'
import { useVisibilityChange } from '@netzap/ui/hooks/use-visibility-change'

import { useSocketContext } from '@/app/wa/[instanceId]/providers/socket-provider'
import { useSocketEmitter } from '@/hooks/socket/use-socket-emitter'
import { usePageContext } from '../../providers/page-provider'

import { useSocketEvent } from '@/hooks/socket/use-socket-event'
import { remeda } from '@/lib/remeda'
import { Button } from '@netzap/ui/components/button'
import { Each } from '@netzap/ui/components/utilities/each'
import { DailyMessagesItem } from './daily-messages-item'

interface DailyMessagesListProps {
  limit: number
}

export function DailyMessagesList({ limit }: DailyMessagesListProps) {
  const socket = useSocketContext()
  const { scrollRef } = usePageContext()
  const { instanceId, waChatId } = useChatParams()

  const [dailyMessages, { fetchNextPage, hasNextPage, isFetching }] =
    useFetchDailyMessages({
      params: { instanceId, waChatId },
      query: { page: 1, limit },
    })

  const handleEmitChatRead = useSocketEmitter(socket, 'chat:read')

  const handleScrollToLastMessage = useCallback(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    // https://github.com/radix-ui/primitives/discussions/990
    scrollElement.scrollTo({ top: scrollElement.scrollHeight })
    handleEmitChatRead({ waChatId })
  }, [scrollRef, handleEmitChatRead, waChatId])

  useEffect(() => {
    handleScrollToLastMessage()
  }, [handleScrollToLastMessage])

  const isDocumentVisible = useVisibilityChange()
  const handleMessageCreate = useCallback(
    ({ message }: MessageCreateServerEventPayload) => {
      if (!message.isFromMe || !isDocumentVisible) return

      remeda.debounce(handleScrollToLastMessage, { waitMs: 150 }).call()
    },
    [isDocumentVisible, handleScrollToLastMessage]
  )

  useSocketEvent(socket, 'message:create', handleMessageCreate)

  const handleFetchNextPage = useCallback(
    () => fetchNextPage(),
    [fetchNextPage]
  )

  return (
    <div className="space-y-3">
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
        items={dailyMessages}
        render={item => (
          <DailyMessagesItem
            dailyMessages={item}
            key={item.date.toISOString()}
          />
        )}
      />
    </div>
  )
}
