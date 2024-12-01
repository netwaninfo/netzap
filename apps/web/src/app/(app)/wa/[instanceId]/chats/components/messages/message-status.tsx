import { MessageStatus as Status } from '@netzap/entities/chat'

import {
  MessageStatusDefault,
  MessageStatusRead,
  MessageStatusSent,
} from '../ui/message'

interface MessageStatusProps {
  status: Status
}

export function MessageStatus({ status }: MessageStatusProps) {
  switch (status) {
    case 'sent':
      return <MessageStatusSent />

    case 'read':
      return <MessageStatusRead />

    default:
      return <MessageStatusDefault />
  }
}
