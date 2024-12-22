import type { PrivateAudioMessage } from '@netzap/entities/chat'

import { Headphones } from 'lucide-react'
import {
  Message,
  MessageBody,
  MessageContent,
  MessageIcon,
} from '../../ui/message'
import { MessageStatus } from '../message-status'

interface PrivateChatLastAudioMessageProps {
  message: PrivateAudioMessage
}

export function PrivateChatLastAudioMessage({
  message,
}: PrivateChatLastAudioMessageProps) {
  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageIcon>
          <Headphones className="size-4" />
        </MessageIcon>

        <MessageBody>Audio</MessageBody>
      </MessageContent>
    </Message>
  )
}
