import { GroupRevokedMessage } from '@netzap/entities/chat'

import { getMessageAuthorName } from '@/utils/get-message-author-name'
import { Ban } from 'lucide-react'
import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
  MessageContentGroup,
  MessageIcon,
} from '../../ui/message'
import { MessageStatus } from '../message-status'

interface GroupChatLastRevokedMessageProps {
  message: GroupRevokedMessage
}

export function GroupChatLastRevokedMessage({
  message,
}: GroupChatLastRevokedMessageProps) {
  const author = getMessageAuthorName(message.author)

  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageAuthor>{author}</MessageAuthor>

        <MessageContentGroup>
          <MessageIcon>
            <Ban className="size-4" />
          </MessageIcon>

          <MessageBody>Mensagem apagada</MessageBody>
        </MessageContentGroup>
      </MessageContent>
    </Message>
  )
}
