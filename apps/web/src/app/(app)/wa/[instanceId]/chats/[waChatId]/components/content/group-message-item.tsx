import { Each } from '@/components/utilities/each'
import type { GroupMessage } from '@/hooks/queries/use-fetch-messages'
import { formatGroupMessageDate } from '@/utils/format-group-message-date'
import { MessageItem } from '../messages/message-item'
import {
  DayGroup,
  DayGroupContent,
  DayGroupDate,
  DayGroupHeader,
} from '../ui/day-group'

interface GroupMessageItemProps {
  group: GroupMessage
}

export function GroupMessageItem({ group }: GroupMessageItemProps) {
  const relativeDate = formatGroupMessageDate({ date: group.date })

  return (
    <DayGroup>
      <DayGroupHeader>
        <DayGroupDate dateTime={relativeDate.datetime}>
          {relativeDate.display}
        </DayGroupDate>
      </DayGroupHeader>

      <DayGroupContent>
        <Each
          items={group.messages}
          render={({ item }) => <MessageItem message={item} />}
        />
      </DayGroupContent>
    </DayGroup>
  )
}
