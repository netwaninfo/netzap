import type { PrivateVoiceMessage } from '@netzap/entities/chat'

import {
  Message,
  MessageBody,
  MessageContent,
  MessageIcon,
} from '@/pages/instanceId/chats/components/message'
import { MessageStatus } from '@/pages/instanceId/chats/components/message-status'
import { Mic } from 'lucide-react'

interface PrivateChatLastVoiceMessageProps {
  message: PrivateVoiceMessage
}

export function PrivateChatLastVoiceMessage({
  message,
}: PrivateChatLastVoiceMessageProps) {
  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageIcon>
          <Mic className="size-4" />
        </MessageIcon>

        <MessageBody>Audio</MessageBody>
      </MessageContent>
    </Message>
  )
}
