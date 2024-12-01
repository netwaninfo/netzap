import { PrivateDocumentMessage } from '@netzap/entities/chat'

import { FileText } from 'lucide-react'
import {
  Message,
  MessageBody,
  MessageContent,
  MessageIcon,
} from '../../ui/message'
import { MessageStatus } from '../message-status'

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
