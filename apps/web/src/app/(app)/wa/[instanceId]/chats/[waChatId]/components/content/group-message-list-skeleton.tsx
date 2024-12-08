import { SkeletonList } from '@/components/custom/skeleton-list'
import { ChatContentWrapper } from '../ui/chat'
import { GroupMessageItemSkeleton } from './group-message-item-skeleton'

interface GroupMessagesListSkeletonProps {
  amount: number
}

export function GroupMessagesListSkeleton({
  amount,
}: GroupMessagesListSkeletonProps) {
  return (
    <ChatContentWrapper>
      <SkeletonList
        amount={amount}
        render={() => <GroupMessageItemSkeleton />}
      />
    </ChatContentWrapper>
  )
}
