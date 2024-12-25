import type { GroupVideoMessage } from '@netzap/entities/chat'
import { Video } from 'lucide-react'

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

interface GroupChatLastVideoMessageProps {
  message: GroupVideoMessage
}

export function GroupChatLastVideoMessage({
  message,
}: GroupChatLastVideoMessageProps) {
  const author = useNameOfAuthor(message.author)

  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageAuthor>{author}:</MessageAuthor>

        <MessageContentGroup>
          <MessageIcon>
            <Video className="size-4" />
          </MessageIcon>

          <MessageBody>{message.body ? message.body : 'Video'}</MessageBody>
        </MessageContentGroup>
      </MessageContent>
    </Message>
  )
}
