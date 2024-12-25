'use client'

import type { GroupChat } from '@netzap/entities/chat'
import { Users } from 'lucide-react'

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
} from '../../chat'
import { GroupChatLastMessage } from './messages/group/message'
import { useChatItem } from './use-chat-item'

interface GroupChatItemProps {
  chat: GroupChat
}

export function GroupChatItem({ chat }: GroupChatItemProps) {
  const {
    canShowUnreadCounter,
    handleSelect,
    hasUnreadCount,
    calendarDate,
    isCurrentChat,
  } = useChatItem({ chat })

  return (
    <Chat onClick={handleSelect} active={isCurrentChat}>
      <ChatAvatar>
        {chat.group.imageUrl && (
          <ChatAvatarImage src={chat.group.imageUrl} alt="" />
        )}

        <ChatAvatarFallback>
          <Users className="size-5 text-muted-foreground" />
        </ChatAvatarFallback>
      </ChatAvatar>

      <ChatContent>
        <ChatContentGroup>
          <ChatName>{chat.group.name}</ChatName>

          {calendarDate && (
            <ChatDate dateTime={calendarDate.datetime}>
              {calendarDate.text}
            </ChatDate>
          )}
        </ChatContentGroup>

        <ChatContentGroup>
          {chat.lastMessage && (
            <GroupChatLastMessage message={chat.lastMessage} />
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
