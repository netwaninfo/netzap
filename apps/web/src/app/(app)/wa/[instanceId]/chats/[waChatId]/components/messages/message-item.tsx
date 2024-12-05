import { Message } from '@netzap/entities/chat'
import { MessageItemReceived } from './message-item-received'
import { MessageItemSent } from './message-item-sent'

interface MessageItemProps {
  message: Message
}

export function MessageItem({ message }: MessageItemProps) {
  if (message.isFromMe) {
    return <MessageItemSent message={message} />
  }

  return <MessageItemReceived message={message} />
}
