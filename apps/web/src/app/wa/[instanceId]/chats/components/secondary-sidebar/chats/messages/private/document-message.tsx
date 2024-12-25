import type { PrivateDocumentMessage } from '@netzap/entities/chat'

import {
  Message,
  MessageBody,
  MessageContent,
  MessageIcon,
} from '@/pages/instanceId/chats/components/message'
import { MessageStatus } from '@/pages/instanceId/chats/components/message-status'
import { FileText } from 'lucide-react'

interface PrivateChatLastDocumentMessageProps {
  message: PrivateDocumentMessage
}

export function PrivateChatLastDocumentMessage({
  message,
}: PrivateChatLastDocumentMessageProps) {
  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageIcon>
          <FileText className="size-4" />
        </MessageIcon>

        <MessageBody>{message.body ? message.body : 'Documento'}</MessageBody>
      </MessageContent>
    </Message>
  )
}
