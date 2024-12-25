import { Skeleton } from '@netzap/ui/components/skeleton'
import { SkeletonList } from '@netzap/ui/components/utilities/skeleton-list'
import {
  DailyMessagesGroup,
  DailyMessagesGroupContent,
  DailyMessagesGroupHeader,
} from '../daily-messages-group'
import { MessageItemSkelton } from './messages/message-item-skeleton'

export function DailyMessagesItemSkeleton() {
  return (
    <DailyMessagesGroup>
      <DailyMessagesGroupHeader>
        <Skeleton className="w-20 h-7" />
      </DailyMessagesGroupHeader>

      <DailyMessagesGroupContent>
        <SkeletonList
          amount={5}
          render={(_, i) => <MessageItemSkelton key={i} />}
        />
      </DailyMessagesGroupContent>
    </DailyMessagesGroup>
  )
}
