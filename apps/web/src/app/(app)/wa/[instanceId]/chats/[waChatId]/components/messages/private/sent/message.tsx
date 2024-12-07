import { PrivateMessage } from '@netzap/entities/chat'
import { SentPrivateTextMessage } from './text-message'

interface SentPrivateMessageProps {
  message: PrivateMessage
}

export function SentPrivateMessage({ message }: SentPrivateMessageProps) {
  switch (message.type) {
    case 'text':
      return <SentPrivateTextMessage message={message} />

    default:
      return null
  }
}
