import { Skeleton } from '@netzap/ui/components/skeleton'
import { MessageSent } from '../../message-sent'

export function MessageItemSentSkeleton() {
  return (
    <MessageSent>
      <Skeleton className="w-80 h-20 rounded-md" />
    </MessageSent>
  )
}
