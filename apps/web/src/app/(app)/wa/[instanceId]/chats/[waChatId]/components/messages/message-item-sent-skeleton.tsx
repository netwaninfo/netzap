import { Skeleton } from '@/components/ui/skeleton'
import { MessageSent } from '../ui/message-sent'

export function MessageItemSentSkeleton() {
  return (
    <MessageSent>
      <Skeleton className="w-80 h-20 rounded-md" />
    </MessageSent>
  )
}
