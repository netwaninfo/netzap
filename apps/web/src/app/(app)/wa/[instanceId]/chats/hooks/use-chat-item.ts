import type { Chat } from '@netzap/entities/chat'
import { useRouter } from 'next/navigation'

import { useInstanceParams } from '@/hooks/use-instance-params'
import { useParsedParams } from '@/hooks/use-parsed-params'
import { formatRelativeDate } from '@/utils/format-relative-date'
import { z } from 'zod'

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

  const relativeDate =
    interactionDate &&
    formatRelativeDate({
      date: interactionDate,
    })

  const canShowUnreadCounter = chat.unreadCount !== 0
  const hasUnreadCount = chat.unreadCount > 0

  const isCurrentChat = waChatId === chat.waChatId

  function handleSelect() {
    if (isCurrentChat) return

    return router.push(`/wa/${instanceId}/chats/${chat.waChatId}`)
  }

  return {
    relativeDate,
    canShowUnreadCounter,
    hasUnreadCount,
    handleSelect,
    isCurrentChat,
  }
}
