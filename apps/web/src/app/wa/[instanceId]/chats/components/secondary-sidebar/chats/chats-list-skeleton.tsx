import { ChatItemSkeleton } from '../chats/chat-item-skeleton'

import { SkeletonList } from '@netzap/ui/components/utilities/skeleton-list'

interface ChatsListSkeletonProps {
  amount: number
}

export function ChatsListSkeleton({ amount }: ChatsListSkeletonProps) {
  return (
    <SkeletonList
      amount={amount}
      render={(_, i) => <ChatItemSkeleton key={i} />}
    />
  )
}
