import type { GroupUnknownMessage } from '@netzap/entities/chat'
import { CircleHelp } from 'lucide-react'

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

interface GroupChatLastUnknownMessageProps {
  message: GroupUnknownMessage
}

export function GroupChatLastUnknownMessage({
  message,
}: GroupChatLastUnknownMessageProps) {
  const author = useNameOfAuthor(message.author)

  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageAuthor>{author}:</MessageAuthor>

        <MessageContentGroup>
          <MessageIcon>
            <CircleHelp className="size-4" />
          </MessageIcon>

          <MessageBody>Mensagem não disponível</MessageBody>
        </MessageContentGroup>
      </MessageContent>
    </Message>
  )
}
