import { Contact } from '@netzap/entities/chat'
import { User } from 'lucide-react'
import {
  ChatAvatar,
  ChatAvatarFallback,
  ChatAvatarImage,
  ChatHeader,
  ChatHeaderGroup,
  ChatPhone,
  ChatTitle,
} from './ui/chat'

interface PrivateChatHeaderProps {
  contact: Contact
}

export function PrivateChatHeader({ contact }: PrivateChatHeaderProps) {
  return (
    <ChatHeader>
      <ChatAvatar>
        {contact.imageUrl && <ChatAvatarImage src={contact.imageUrl} alt="" />}
        <ChatAvatarFallback>
          <User className="size-5 text-muted-foreground" />
        </ChatAvatarFallback>
      </ChatAvatar>

      <ChatHeaderGroup>
        <ChatTitle>{contact.name}</ChatTitle>
        <ChatPhone>{contact.phone}</ChatPhone>
      </ChatHeaderGroup>
    </ChatHeader>
  )
}
