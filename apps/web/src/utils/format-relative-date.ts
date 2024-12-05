import { dayjs } from '@/lib/dayjs'

interface FormatKeys {
  sameDay: string
  nextDay: string
  nextWeek: string
  lastDay: string
  lastWeek: string
  sameElse: string
}

interface FormatRelativeDateParams {
  date: Date
  formats?: Partial<FormatKeys>
}

function formatRelativeDate({ date, formats }: FormatRelativeDateParams) {
  const ref = dayjs(date)

  return {
    datetime: ref.format('L'),
    display: dayjs(date).calendar(new Date(), {
      sameDay: 'HH:mm',
      lastDay: '[Ontem]',
      sameElse: 'L',
      lastWeek: 'L',
      ...formats,
    }),
  }
}

export { formatRelativeDate, type FormatRelativeDateParams }
