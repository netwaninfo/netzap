'use client'

import { GroupChat } from '@netzap/entities/chat'

import { User } from 'lucide-react'

import { useInstanceParams } from '@/hooks/use-instance-params'
import { formatRelativeDate } from '@/utils/format-relative-date'
import { useRouter } from 'next/navigation'
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
        <ChatAvatarImage src={chat.group.imageUrl ?? ''} alt="" />
        <ChatAvatarFallback>
          <User className="size-5 text-muted-foreground" />
        </ChatAvatarFallback>
      </ChatAvatar>

      <ChatContent>
        <ChatContentGroup>
          <ChatName>{chat.group.name}</ChatName>

          <ChatTime dateTime={relativeDate.datetime}>
            {relativeDate.display}
          </ChatTime>
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
