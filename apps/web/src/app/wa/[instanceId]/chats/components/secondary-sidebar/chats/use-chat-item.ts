import type { Chat } from '@netzap/entities/chat'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { useInstanceParams } from '@/hooks/use-instance-params'

import { formatCalendarDate } from '@/hooks/use-calendar-date'
import { useParsedParams } from '@netzap/ui/hooks/use-parsed-params'
import { useCallback } from 'react'

interface UseChatItemParams {
  chat: Chat
}

const chatsParams = z.object({
  waChatId: z
    .string()
    .optional()
    .transform(value => value && decodeURIComponent(value)),
})

export function useChatItem({ chat }: UseChatItemParams) {
  const router = useRouter()

  const { instanceId } = useInstanceParams()
  const { waChatId } = useParsedParams(chatsParams)

  const interactionDate = chat.lastMessage?.createdAt || chat.lastInteractionAt
  const calendarDate =
    interactionDate && formatCalendarDate({ date: interactionDate })

  const canShowUnreadCounter = chat.unreadCount !== 0
  const hasUnreadCount = chat.unreadCount > 0
  const isCurrentChat = waChatId === chat.waChatId

  const handleSelect = useCallback(() => {
    if (isCurrentChat) return

    return router.push(`/wa/${instanceId}/chats/${chat.waChatId}`)
  }, [isCurrentChat, router, chat, instanceId])

  return {
    calendarDate,
    canShowUnreadCounter,
    hasUnreadCount,
    handleSelect,
    isCurrentChat,
  }
}
