import { Chat } from '@netzap/entities/chat'
import { useRouter } from 'next/navigation'

import { useInstanceParams } from '@/hooks/use-instance-params'
import { formatRelativeDate } from '@/utils/format-relative-date'

interface UseChatItemParams {
  chat: Chat
}

export function useChatItem({ chat }: UseChatItemParams) {
  const router = useRouter()
  const { instanceId } = useInstanceParams()

  const interactionDate = chat.lastMessage?.createdAt || chat.lastInteractionAt

  const relativeDate =
    interactionDate &&
    formatRelativeDate({
      date: interactionDate,
    })

  const canShowUnreadCounter = chat.unreadCount !== 0
  const hasUnreadCount = chat.unreadCount > 0

  function handleSelect() {
    router.push(`/wa/${instanceId}/chats/${chat.waChatId}`)
  }

  return {
    relativeDate,
    canShowUnreadCounter,
    hasUnreadCount,
    handleSelect,
  }
}
