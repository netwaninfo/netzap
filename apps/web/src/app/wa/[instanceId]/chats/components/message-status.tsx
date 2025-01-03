import type { MessageStatus as Status } from '@netzap/entities/chat'

import {
  MessageStatusDefault,
  MessageStatusError,
  MessageStatusPending,
  MessageStatusRead,
  MessageStatusSent,
} from './message'

interface MessageStatusProps {
  status: Status
}

export function MessageStatus({ status }: MessageStatusProps) {
  switch (status) {
    case 'pending':
      return <MessageStatusPending />

    case 'sent':
      return <MessageStatusSent />

    case 'read':
      return <MessageStatusRead />

    case 'error':
      return <MessageStatusError />

    case 'played':
      return <MessageStatusSent />

    default:
      return <MessageStatusDefault />
  }
}
