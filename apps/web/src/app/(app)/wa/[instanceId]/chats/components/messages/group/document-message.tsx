import type { GroupDocumentMessage } from '@netzap/entities/chat'

import { getMessageAuthorName } from '@/utils/get-message-author-name'
import { FileText } from 'lucide-react'
import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
  MessageContentGroup,
  MessageIcon,
} from '../../ui/message'
import { MessageStatus } from '../message-status'

interface GroupChatLastDocumentMessageProps {
  message: GroupDocumentMessage
}

export function GroupChatLastDocumentMessage({
  message,
}: GroupChatLastDocumentMessageProps) {
  const author = getMessageAuthorName(message.author)

  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageAuthor>{author}:</MessageAuthor>

        <MessageContentGroup>
          <MessageIcon>
            <FileText className="size-4" />
          </MessageIcon>

          <MessageBody>{message.body ? message.body : 'Documento'}</MessageBody>
        </MessageContentGroup>
      </MessageContent>
    </Message>
  )
}
