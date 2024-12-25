import type { GroupVCardMessage } from '@netzap/entities/chat'
import { UserRound } from 'lucide-react'

import { useNameOfAuthor } from '@/hooks/use-name-of-author'

import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
  MessageContentGroup,
  MessageIcon,
} from '@/pages/instanceId/chats/components/message'
import { MessageStatus } from '@/pages/instanceId/chats/components/message-status'

interface GroupChatLastVCardMessageProps {
  message: GroupVCardMessage
}

export function GroupChatLastVCardMessage({
  message,
}: GroupChatLastVCardMessageProps) {
  const author = useNameOfAuthor(message.author)

  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageAuthor>{author}:</MessageAuthor>

        <MessageContentGroup>
          <MessageIcon>
            <UserRound className="size-4" />
          </MessageIcon>

          <MessageBody>{message.contact.name}</MessageBody>
        </MessageContentGroup>
      </MessageContent>
    </Message>
  )
}
