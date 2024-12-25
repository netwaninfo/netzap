import { SkeletonList } from '@netzap/ui/components/utilities/skeleton-list'
import { DailyMessagesItemSkeleton } from './daily-messages-item-skeleton'

interface DailyMessagesListSkeletonProps {
  amount: number
}

export function DailyMessagesListSkeleton({
  amount,
}: DailyMessagesListSkeletonProps) {
  return (
    <SkeletonList
      amount={amount}
      render={(_, i) => <DailyMessagesItemSkeleton key={i} />}
    />
  )
}
