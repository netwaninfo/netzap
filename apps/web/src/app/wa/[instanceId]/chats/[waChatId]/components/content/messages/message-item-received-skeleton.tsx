import { Skeleton } from '@netzap/ui/components/skeleton'
import { MessageReceived } from '../../message-received'

export function MessageItemReceivedSkeleton() {
  return (
    <MessageReceived>
      <Skeleton className="w-80 h-20 rounded-md" />
    </MessageReceived>
  )
}
