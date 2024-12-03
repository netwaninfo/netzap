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
  ChatName,
  ChatTime,
} from '../ui/chat'

interface PrivateChatItemProps {
  chat: PrivateChat
}

export function PrivateChatItem({ chat }: PrivateChatItemProps) {
  const { canShowUnreadCounter, handleSelect, hasUnreadCount, relativeDate } =
    useChatItem({ chat })

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

          {relativeDate && (
            <ChatTime dateTime={relativeDate.datetime}>
              {relativeDate.display}
            </ChatTime>
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
