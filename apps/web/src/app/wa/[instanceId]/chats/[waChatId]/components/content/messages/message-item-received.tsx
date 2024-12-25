import type { Message } from '@netzap/entities/chat'

import { ReceivedGroupMessage } from './group/received/message'
import { ReceivedPrivateMessage } from './private/received/message'

interface MessageItemReceivedProps {
  message: Message
}

export function MessageItemReceived({ message }: MessageItemReceivedProps) {
  switch (message.chatType) {
    case 'private':
      return <ReceivedPrivateMessage message={message} />

    case 'group':
      return <ReceivedGroupMessage message={message} />

    default:
      return null
  }
}
