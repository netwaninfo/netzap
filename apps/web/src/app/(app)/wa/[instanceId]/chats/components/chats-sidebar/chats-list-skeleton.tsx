import { SkeletonList } from '@/components/custom/skeleton-list'
import { ChatItemSkeleton } from '../chats/chat-item-skeleton'
import { ChatListWrapper } from './chat-list-wrapper'

interface ChatsListSkeletonProps {
  amount: number
}

export function ChatsListSkeleton({ amount }: ChatsListSkeletonProps) {
  return (
    <ChatListWrapper>
      <SkeletonList amount={amount} render={() => <ChatItemSkeleton />} />
    </ChatListWrapper>
  )
}
