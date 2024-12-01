import { PrivateImageMessage } from '@netzap/entities/chat'

import { Image } from 'lucide-react'
import {
  Message,
  MessageBody,
  MessageContent,
  MessageIcon,
} from '../../ui/message'
import { MessageStatus } from '../message-status'

interface PrivateChatLastImageMessageProps {
  message: PrivateImageMessage
}

export function PrivateChatLastImageMessage({
  message,
}: PrivateChatLastImageMessageProps) {
  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageIcon>
          <Image className="size-4" />
        </MessageIcon>

        <MessageBody>{message.body ? message.body : 'Imagem'}</MessageBody>
      </MessageContent>
    </Message>
  )
}
