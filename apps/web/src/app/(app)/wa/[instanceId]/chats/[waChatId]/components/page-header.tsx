'use client'

import { usePageContext } from '../providers/page-provider'
import { GroupChatHeader } from './group-chat-header'
import { PrivateChatHeader } from './private-chat-header'

export function PageHeader() {
  const { currentChat } = usePageContext()

  switch (currentChat.type) {
    case 'private':
      return <PrivateChatHeader contact={currentChat.contact} />

    case 'group':
      return <GroupChatHeader group={currentChat.group} />

    default:
      return null
  }
}
