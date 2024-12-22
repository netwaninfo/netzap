import type { PrivateTextMessage } from '@netzap/entities/chat'

import { Message, MessageBody, MessageContent } from '../../ui/message'
import { MessageStatus } from '../message-status'

interface PrivateChatLastTextMessageProps {
  message: PrivateTextMessage
}

export function PrivateChatLastTextMessage({
  message,
}: PrivateChatLastTextMessageProps) {
  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageBody>{message.body}</MessageBody>
      </MessageContent>
    </Message>
  )
}
