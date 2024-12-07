import { MessageItemReceivedSkeleton } from './message-item-received-skeleton'
import { MessageItemSentSkeleton } from './message-item-sent-skeleton'

export function MessageItemSkelton() {
  const isFromMe = Math.random() >= 0.5

  if (isFromMe) {
    return <MessageItemSentSkeleton />
  }

  return <MessageItemReceivedSkeleton />
}
