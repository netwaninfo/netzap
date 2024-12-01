import { dayjs } from '@/lib/dayjs'

interface FormatRelativeDateProps {
  date: Date
}

export function formatRelativeDate({ date }: FormatRelativeDateProps) {
  const ref = dayjs(date)

  return {
    datetime: ref.format('L'),
    display: dayjs(date).calendar(new Date(), {
      sameDay: 'HH:mm',
      lastDay: '[Ontem]',
      sameElse: 'L',
      lastWeek: 'L',
    }),
  }
}
