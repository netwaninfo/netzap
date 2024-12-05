import { formatRelativeDate } from './format-relative-date'

interface FormatGroupMessageDateParams {
  date: Date
}

function formatGroupMessageDate({ date }: FormatGroupMessageDateParams) {
  return formatRelativeDate({
    date,
    formats: {
      sameDay: '[Hoje]',
    },
  })
}

export { formatGroupMessageDate }
