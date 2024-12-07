import { Skeleton } from '@/components/ui/skeleton'
import { MessageReceived } from '../ui/message-received'

export function MessageItemReceivedSkeleton() {
  return (
    <MessageReceived>
      <Skeleton className="w-80 h-20 rounded-md" />
    </MessageReceived>
  )
}
