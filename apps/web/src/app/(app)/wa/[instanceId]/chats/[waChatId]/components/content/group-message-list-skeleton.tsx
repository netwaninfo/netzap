import { SkeletonList } from '@/components/custom/skeleton-list'
import { GroupMessageItemSkeleton } from './group-message-item-skeleton'

export function GroupMessagesListSkeleton() {
  return <SkeletonList amount={3} render={() => <GroupMessageItemSkeleton />} />
}
