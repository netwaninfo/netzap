import { Message } from '@netzap/entities/chat'

import { dayjs } from '@/lib/dayjs'

import {
  UseFetchMessagesProps,
  useFetchMessages,
} from './queries/use-fetch-messages'

interface GroupMessage {
  date: Date
  messages: Message[]
}

interface UseGroupedMessagesProps extends UseFetchMessagesProps {}

function useGroupedMessages({ params, query }: UseGroupedMessagesProps) {
  const [data, rest] = useFetchMessages({ params, query })

  const messages = data.pages.flatMap(page => page.data).reverse()
  const messagesGroupedByDate = Object.groupBy(messages, item =>
    dayjs(item.createdAt).format('YYYY-MM-DD')
  )

  const groups = Object.entries(messagesGroupedByDate).map(([key, value]) => ({
    date: dayjs(key).toDate(),
    messages: value,
  })) as GroupMessage[]

  return [groups, rest] as const
}

export { useGroupedMessages, type GroupMessage }
