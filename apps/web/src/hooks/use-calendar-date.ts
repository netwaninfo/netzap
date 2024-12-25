import { dayjs } from '@/lib/dayjs'

interface FormatKeys {
  sameDay: string
  nextDay: string
  nextWeek: string
  lastDay: string
  lastWeek: string
  sameElse: string
}

interface UseCalendarDateProps {
  date: Date | string
  formats?: Partial<FormatKeys>
}

interface CalendarDate {
  datetime: string
  text: string
}

function formatCalendarDate({
  date,
  formats,
}: UseCalendarDateProps): CalendarDate {
  const ref = dayjs(date)

  return {
    datetime: ref.format('L'),
    text: dayjs(date).calendar(new Date(), {
      sameDay: 'HH:mm',
      lastDay: '[Ontem]',
      sameElse: 'L',
      lastWeek: 'L',
      ...formats,
    }),
  }
}

function useCalendarDate(props: UseCalendarDateProps) {
  return formatCalendarDate(props)
}

export { useCalendarDate, formatCalendarDate, type CalendarDate }
