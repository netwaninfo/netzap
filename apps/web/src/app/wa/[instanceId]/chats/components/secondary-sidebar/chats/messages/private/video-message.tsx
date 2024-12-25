import type { PrivateVideoMessage } from '@netzap/entities/chat'
import { Video } from 'lucide-react'

import {
  Message,
  MessageBody,
  MessageContent,
  MessageIcon,
} from '@/pages/instanceId/chats/components/message'
import { MessageStatus } from '@/pages/instanceId/chats/components/message-status'

interface PrivateChatLastVideoMessageProps {
  message: PrivateVideoMessage
}

export function PrivateChatLastVideoMessage({
  message,
}: PrivateChatLastVideoMessageProps) {
  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageIcon>
          <Video className="size-4" />
        </MessageIcon>

        <MessageBody>{message.body ? message.body : 'Video'}</MessageBody>
      </MessageContent>
    </Message>
  )
}
