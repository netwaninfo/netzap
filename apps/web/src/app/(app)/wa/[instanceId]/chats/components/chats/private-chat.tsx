'use client'

import { PrivateChat } from '@netzap/entities/chat'

import { User } from 'lucide-react'
import { useChatItem } from '../../hooks/use-chat-item'
import { PrivateChatLastMessage } from '../messages/private/message'
import {
  Chat,
  ChatAvatar,
  ChatAvatarFallback,
  ChatAvatarImage,
  ChatContent,
  ChatContentGroup,
  ChatCounter,
  ChatDate,
  ChatName,
} from '../ui/chat'

interface PrivateChatItemProps {
  chat: PrivateChat
}

export function PrivateChatItem({ chat }: PrivateChatItemProps) {
  const {
    canShowUnreadCounter,
    handleSelect,
    hasUnreadCount,
    relativeDate,
    isCurrentChat,
  } = useChatItem({ chat })

  return (
    <Chat onClick={handleSelect} active={isCurrentChat}>
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

          {relativeDate && (
            <ChatDate dateTime={relativeDate.datetime}>
              {relativeDate.display}
            </ChatDate>
          )}
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
