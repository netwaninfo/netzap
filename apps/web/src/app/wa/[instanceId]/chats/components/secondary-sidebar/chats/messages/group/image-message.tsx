import type { GroupImageMessage } from '@netzap/entities/chat'
import { Image } from 'lucide-react'

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

interface GroupChatLastImageMessageProps {
  message: GroupImageMessage
}

export function GroupChatLastImageMessage({
  message,
}: GroupChatLastImageMessageProps) {
  const author = useNameOfAuthor(message.author)

  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageAuthor>{author}:</MessageAuthor>

        <MessageContentGroup>
          <MessageIcon>
            <Image className="size-4" />
          </MessageIcon>

          <MessageBody>{message.body ? message.body : 'Imagem'}</MessageBody>
        </MessageContentGroup>
      </MessageContent>
    </Message>
  )
}
