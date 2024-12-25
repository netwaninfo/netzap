import type { PrivateUnknownMessage } from '@netzap/entities/chat'
import { CircleHelp } from 'lucide-react'

import {
  Message,
  MessageBody,
  MessageContent,
  MessageIcon,
} from '@/pages/instanceId/chats/components/message'
import { MessageStatus } from '@/pages/instanceId/chats/components/message-status'

interface PrivateChatLastUnknownMessageProps {
  message: PrivateUnknownMessage
}

export function PrivateChatLastUnknownMessage({
  message,
}: PrivateChatLastUnknownMessageProps) {
  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageIcon>
          <CircleHelp className="size-4" />
        </MessageIcon>

        <MessageBody>Mensagem não disponível</MessageBody>
      </MessageContent>
    </Message>
  )
}
