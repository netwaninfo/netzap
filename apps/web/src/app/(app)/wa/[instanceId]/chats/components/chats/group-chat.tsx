'use client'

import { GroupChat } from '@netzap/entities/chat'

import { Users } from 'lucide-react'
import { useChatItem } from '../../hooks/use-chat-item'
import { GroupChatLastMessage } from '../messages/group/message'
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

interface GroupChatItemProps {
  chat: GroupChat
}

export function GroupChatItem({ chat }: GroupChatItemProps) {
  const { canShowUnreadCounter, handleSelect, hasUnreadCount, relativeDate } =
    useChatItem({ chat })

  return (
    <Chat onClick={handleSelect}>
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

          {relativeDate && (
            <ChatTime dateTime={relativeDate.datetime}>
              {relativeDate.display}
            </ChatTime>
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
