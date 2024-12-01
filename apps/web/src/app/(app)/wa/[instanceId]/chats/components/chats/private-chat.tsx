'use client'

import { PrivateChat } from '@netzap/entities/chat'

import { User } from 'lucide-react'

import { useInstanceParams } from '@/hooks/use-instance-params'
import { formatRelativeDate } from '@/utils/format-relative-date'
import { useRouter } from 'next/navigation'
import { PrivateChatLastMessage } from '../messages/private/message'
import {
  Chat,
  ChatAvatar,
  ChatAvatarFallback,
  ChatAvatarImage,
  ChatContent,
  ChatContentGroup,
  ChatCounter,
  ChatName,
  ChatTime,
} from '../ui/chat'

interface PrivateChatItemProps {
  chat: PrivateChat
}

export function PrivateChatItem({ chat }: PrivateChatItemProps) {
  const router = useRouter()
  const { instanceId } = useInstanceParams()

  const relativeDate = formatRelativeDate({
    date: chat.lastMessage?.createdAt ?? chat.lastInteractionAt,
  })

  const canShowUnreadCounter = chat.unreadCount !== 0
  const hasUnreadCount = chat.unreadCount > 0

  function handleSelect() {
    router.push(`/wa/${instanceId}/chats/${chat.waChatId}`)
  }

  return (
    <Chat onClick={handleSelect}>
      <ChatAvatar>
        {chat.contact.imageUrl && (
          <ChatAvatarImage src={chat.contact.imageUrl} alt="" />
        )}

        <ChatAvatarFallback>
          <User className="size-5 text-muted-foreground" />
        </ChatAvatarFallback>
      </ChatAvatar>

      <ChatContent>
        <ChatContentGroup>
          <ChatName>{chat.contact.name}</ChatName>

          <ChatTime dateTime={relativeDate.datetime}>
            {relativeDate.display}
          </ChatTime>
        </ChatContentGroup>

        <ChatContentGroup>
          {chat.lastMessage && (
            <PrivateChatLastMessage message={chat.lastMessage} />
          )}

          {canShowUnreadCounter && (
            <ChatCounter>
              {hasUnreadCount ? chat.unreadCount : null}
            </ChatCounter>
          )}
        </ChatContentGroup>
      </ChatContent>
    </Chat>
  )
}
