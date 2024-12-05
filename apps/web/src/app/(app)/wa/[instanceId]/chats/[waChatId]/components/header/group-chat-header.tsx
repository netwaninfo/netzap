import { Group } from '@netzap/entities/chat'
import { Users } from 'lucide-react'
import {
  ChatAvatar,
  ChatAvatarFallback,
  ChatAvatarImage,
  ChatHeader,
  ChatHeaderGroup,
  ChatTitle,
} from '../ui/chat'

interface GroupChatHeaderProps {
  group: Group
}

export function GroupChatHeader({ group }: GroupChatHeaderProps) {
  return (
    <ChatHeader>
      <ChatAvatar>
        {group.imageUrl && <ChatAvatarImage src={group.imageUrl} alt="" />}

        <ChatAvatarFallback>
          <Users className="size-5 text-muted-foreground" />
        </ChatAvatarFallback>
      </ChatAvatar>

      <ChatHeaderGroup>
        <ChatTitle>{group.name}</ChatTitle>
      </ChatHeaderGroup>
    </ChatHeader>
  )
}
