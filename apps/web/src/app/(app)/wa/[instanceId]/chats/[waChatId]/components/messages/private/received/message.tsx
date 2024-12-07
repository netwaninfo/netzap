import { PrivateMessage } from '@netzap/entities/chat'
import { ReceivedPrivateTextMessage } from './text-message'

interface ReceivedPrivateMessageProps {
  message: PrivateMessage
}

export function ReceivedPrivateMessage({
  message,
}: ReceivedPrivateMessageProps) {
  switch (message.type) {
    case 'text':
      return <ReceivedPrivateTextMessage message={message} />

    default:
      return null
  }
}
