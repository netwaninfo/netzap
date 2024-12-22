import type { PrivateVoiceMessage } from '@netzap/entities/chat'

import { Mic } from 'lucide-react'
import {
  Message,
  MessageBody,
  MessageContent,
  MessageIcon,
} from '../../ui/message'
import { MessageStatus } from '../message-status'

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
