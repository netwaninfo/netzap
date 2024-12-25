import type { Group } from '@netzap/entities/chat'
import { Users } from 'lucide-react'

import {
  ChatPageAvatar,
  ChatPageAvatarFallback,
  ChatPageAvatarImage,
  ChatPageHeader,
  ChatPageHeaderGroup,
  ChatPageTitle,
} from '../chat-page'

interface GroupChatHeaderProps {
  group: Group
}

export function GroupChatHeader({ group }: GroupChatHeaderProps) {
  return (
    <ChatPageHeader>
      <ChatPageAvatar>
        {group.imageUrl && <ChatPageAvatarImage src={group.imageUrl} alt="" />}

        <ChatPageAvatarFallback>
          <Users className="size-5 text-muted-foreground" />
        </ChatPageAvatarFallback>
      </ChatPageAvatar>

      <ChatPageHeaderGroup>
        <ChatPageTitle>{group.name}</ChatPageTitle>
      </ChatPageHeaderGroup>
    </ChatPageHeader>
  )
}
