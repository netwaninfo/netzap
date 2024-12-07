import { GroupMessage } from '@netzap/entities/chat'
import { SentGroupTextMessage } from './text-message'

interface SentGroupMessageProps {
  message: GroupMessage
}

export function SentGroupMessage({ message }: SentGroupMessageProps) {
  switch (message.type) {
    case 'text':
      return <SentGroupTextMessage message={message} />

    default:
      return null
  }
}
