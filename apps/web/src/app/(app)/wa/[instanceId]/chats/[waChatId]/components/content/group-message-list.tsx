'use client'

import { Each } from '@/components/utilities/each'
import { useChatParams } from '@/hooks/use-chat-params'
import { useGroupedMessages } from '@/hooks/use-grouped-messages'
import { GroupMessageItem } from './group-message-item'

export function GroupMessagesList() {
  const { instanceId, waChatId } = useChatParams()

  const [groups] = useGroupedMessages({
    params: { instanceId, waChatId },
    query: { page: 1 },
  })

  return (
    <Each
      items={groups}
      render={({ item }) => <GroupMessageItem group={item} />}
    />
  )
}
