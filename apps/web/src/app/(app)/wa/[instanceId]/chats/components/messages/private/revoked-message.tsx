import type { PrivateRevokedMessage } from '@netzap/entities/chat'

import { Ban } from 'lucide-react'
import {
  Message,
  MessageBody,
  MessageContent,
  MessageIcon,
} from '../../ui/message'

interface PrivateChatLastRevokedMessageProps {
  message: PrivateRevokedMessage
}

export function PrivateChatLastRevokedMessage({
  message,
}: PrivateChatLastRevokedMessageProps) {
  return (
    <Message>
      <MessageContent>
        <MessageIcon>
          <Ban className="size-4" />
        </MessageIcon>

        <MessageBody>Mensagem apagada</MessageBody>
      </MessageContent>
    </Message>
  )
}
