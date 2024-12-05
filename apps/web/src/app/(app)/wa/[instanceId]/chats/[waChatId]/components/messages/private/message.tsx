import { PrivateMessage as PrivateMessageEntity } from '@netzap/entities/chat'
import { MessageBody } from '../../ui/message'
import {
  MessageSent,
  MessageSentContent,
  MessageSentDate,
} from '../../ui/message-sent'

interface PrivateMessageProps {
  message: PrivateMessageEntity
}

export function PrivateMessage({ message }: PrivateMessageProps) {
  return (
    <MessageSent>
      <MessageSentContent>
        <MessageBody>Not bad, just working on a new project. You?</MessageBody>

        <MessageSentDate>{message.createdAt.toISOString()}</MessageSentDate>
      </MessageSentContent>
    </MessageSent>
  )
}
