import { Chat as ChatEntity } from '@netzap/entities/chat'
import { GroupChatItem } from './group-chat'
import { PrivateChatItem } from './private-chat'

interface ChatItemProps {
  chat: ChatEntity
}

export function ChatItem({ chat }: ChatItemProps) {
  switch (chat.type) {
    case 'private':
      return <PrivateChatItem chat={chat} />

    case 'group':
      return <GroupChatItem chat={chat} />

    default:
      return null
  }
}
