'use client'

import { Each } from '@/components/utilities/each'
import { useFetchChats } from '@/hooks/queries/use-fetch-chats'
import { useInstanceParams } from '@/hooks/use-instance-params'
import { ChatItem } from '../chats/chat-item'

export function ChatsList() {
  const { instanceId } = useInstanceParams()
  const [data] = useFetchChats({ params: { instanceId }, query: { page: 1 } })

  const chats = data.pages.flatMap(page => page.data)

  return <Each items={chats} render={({ item }) => <ChatItem chat={item} />} />
}
