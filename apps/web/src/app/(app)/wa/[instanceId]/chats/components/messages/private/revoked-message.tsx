import { PrivateRevokedMessage } from '@netzap/entities/chat'

import { Ban } from 'lucide-react'
import {
  Message,
  MessageBody,
  MessageContent,
  MessageIcon,
} from '../../ui/message'
import { MessageStatus } from '../message-status'

interface PrivateChatLastRevokedMessageProps {
  message: PrivateRevokedMessage
}

export function PrivateChatLastRevokedMessage({
  message,
}: PrivateChatLastRevokedMessageProps) {
  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageIcon>
          <Ban className="size-4" />
        </MessageIcon>

        <MessageBody>Mensagem apagada</MessageBody>
      </MessageContent>
    </Message>
  )
}
