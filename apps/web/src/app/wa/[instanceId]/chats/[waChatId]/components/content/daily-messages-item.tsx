import type { DailyMessages } from '@/hooks/queries/use-fetch-daily-messages'
import { useCalendarDate } from '@/hooks/use-calendar-date'
import { Each } from '@netzap/ui/components/utilities/each'
import {
  DailyMessagesGroup,
  DailyMessagesGroupContent,
  DailyMessagesGroupDate,
  DailyMessagesGroupHeader,
} from '../daily-messages-group'
import { MessageItem } from './messages/message-item'

interface DailyMessagesItemProps {
  dailyMessages: DailyMessages
}

export function DailyMessagesItem({ dailyMessages }: DailyMessagesItemProps) {
  const calendarDate = useCalendarDate({
    date: dailyMessages.date,
    formats: { sameDay: '[Hoje]', lastWeek: 'dddd' },
  })

  return (
    <DailyMessagesGroup>
      <DailyMessagesGroupHeader>
        <DailyMessagesGroupDate dateTime={calendarDate.datetime}>
          {calendarDate.text}
        </DailyMessagesGroupDate>
      </DailyMessagesGroupHeader>

      <DailyMessagesGroupContent>
        <Each
          items={dailyMessages.messages}
          render={item => <MessageItem message={item} key={item.id} />}
        />
      </DailyMessagesGroupContent>
    </DailyMessagesGroup>
  )
}
