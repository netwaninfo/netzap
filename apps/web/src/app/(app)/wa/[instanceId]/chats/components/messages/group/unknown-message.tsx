import { GroupUnknownMessage } from '@netzap/entities/chat'

import { getMessageAuthorName } from '@/utils/get-message-author-name'
import { CircleHelp } from 'lucide-react'
import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
  MessageContentGroup,
  MessageIcon,
} from '../../ui/message'
import { MessageStatus } from '../message-status'

interface GroupChatLastUnknownMessageProps {
  message: GroupUnknownMessage
}

export function GroupChatLastUnknownMessage({
  message,
}: GroupChatLastUnknownMessageProps) {
  const author = getMessageAuthorName(message.author)

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
