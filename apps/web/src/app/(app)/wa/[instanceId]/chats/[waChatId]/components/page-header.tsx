'use client'

import { usePageContext } from '../providers/page-provider'
import { GroupChatHeader } from './group-chat-header'
import { PrivateChatHeader } from './private-chat-header'

export function PageHeader() {
  const { chat } = usePageContext()

  switch (chat.type) {
    case 'private':
      return <PrivateChatHeader contact={chat.contact} />

    case 'group':
      return <GroupChatHeader group={chat.group} />

    default:
      return null
  }
}
