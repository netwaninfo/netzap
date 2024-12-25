import type { GroupDocumentMessage } from '@netzap/entities/chat'
import { FileText } from 'lucide-react'

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

interface GroupChatLastDocumentMessageProps {
  message: GroupDocumentMessage
}

export function GroupChatLastDocumentMessage({
  message,
}: GroupChatLastDocumentMessageProps) {
  const author = useNameOfAuthor(message.author)

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
