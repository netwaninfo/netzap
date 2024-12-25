import type { Message } from '@netzap/entities/chat'

import type { CalendarDate } from '@/hooks/use-calendar-date'
import { dayjs } from '@/lib/dayjs'

interface UseMessageItemProps {
  message: Message
}

interface UseMessageItemReturn {
  calendarDate: CalendarDate
}

function useMessageItem({
  message,
}: UseMessageItemProps): UseMessageItemReturn {
  const dateRef = dayjs(message.createdAt)

  const calendarDate: CalendarDate = {
    datetime: dateRef.toISOString(),
    text: dateRef.format('HH:mm'),
  }

  return {
    calendarDate,
  }
}

export { useMessageItem, type UseMessageItemProps, type UseMessageItemReturn }
