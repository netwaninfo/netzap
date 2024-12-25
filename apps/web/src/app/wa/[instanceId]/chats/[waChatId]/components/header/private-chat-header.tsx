import type { Contact } from '@netzap/entities/chat'
import { User } from 'lucide-react'

import {
  ChatPageAvatar,
  ChatPageAvatarFallback,
  ChatPageAvatarImage,
  ChatPageHeader,
  ChatPageHeaderGroup,
  ChatPagePhone,
  ChatPageTitle,
} from '../chat-page'

interface PrivateChatHeaderProps {
  contact: Contact
}

export function PrivateChatHeader({ contact }: PrivateChatHeaderProps) {
  return (
    <ChatPageHeader>
      <ChatPageAvatar>
        {contact.imageUrl && (
          <ChatPageAvatarImage src={contact.imageUrl} alt="" />
        )}
        <ChatPageAvatarFallback>
          <User className="size-5 text-muted-foreground" />
        </ChatPageAvatarFallback>
      </ChatPageAvatar>

      <ChatPageHeaderGroup>
        <ChatPageTitle>{contact.name}</ChatPageTitle>
        <ChatPagePhone>{contact.phone}</ChatPagePhone>
      </ChatPageHeaderGroup>
    </ChatPageHeader>
  )
}
