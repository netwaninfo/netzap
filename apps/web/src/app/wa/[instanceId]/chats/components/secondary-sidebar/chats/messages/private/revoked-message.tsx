import type { PrivateRevokedMessage } from '@netzap/entities/chat'

import {
  Message,
  MessageBody,
  MessageContent,
  MessageIcon,
} from '@/pages/instanceId/chats/components/message'
import { Ban } from 'lucide-react'

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
