import { SkeletonList } from '@/components/custom/skeleton-list'
import { Skeleton } from '@/components/ui/skeleton'
import { MessageItemSkelton } from '../messages/message-item-skeleton'
import { DayGroup, DayGroupContent, DayGroupHeader } from '../ui/day-group'

export function GroupMessageItemSkeleton() {
  return (
    <DayGroup>
      <DayGroupHeader>
        <Skeleton className="w-24 h-10" />
      </DayGroupHeader>

      <DayGroupContent>
        <SkeletonList amount={5} render={() => <MessageItemSkelton />} />
      </DayGroupContent>
    </DayGroup>
  )
}
