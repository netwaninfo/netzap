import { Message } from '@netzap/entities/chat'

import { SentGroupMessage } from './group/sent/message'
import { SentPrivateMessage } from './private/sent/message'

interface MessageItemSentProps {
  message: Message
}

export function MessageItemSent({ message }: MessageItemSentProps) {
  switch (message.chatType) {
    case 'private':
      return <SentPrivateMessage message={message} />

    case 'group':
      return <SentGroupMessage message={message} />

    default:
      return null
  }
}
