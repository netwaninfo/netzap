'use client'

import { Contact } from '@netzap/entities/chat'
import { User } from 'lucide-react'

import { useInstanceParams } from '@/hooks/use-instance-params'
import Link from 'next/link'
import { MessageSentShape } from '../ui/message-sent'
import {
  MessageContact,
  MessageContactAvatar,
  MessageContactAvatarFallback,
  MessageContactAvatarImage,
  MessageContactContent,
  MessageContactName,
  MessageContactPhone,
} from './message-contact'

interface SentContactItemProps {
  contact: Contact
}

export function SentContactItem({ contact }: SentContactItemProps) {
  const { instanceId } = useInstanceParams()

  const contactChatUrl = `/wa/${instanceId}/chats/${contact.waContactId}`

  return (
    <Link href={contactChatUrl} className="block">
      <MessageSentShape>
        <MessageContact>
          <MessageContactAvatar>
            {contact.imageUrl && (
              <MessageContactAvatarImage src={contact.imageUrl} alt="" />
            )}

            <MessageContactAvatarFallback>
              <User className="size-4" />
            </MessageContactAvatarFallback>
          </MessageContactAvatar>

          <MessageContactContent>
            <MessageContactName>{contact.name}</MessageContactName>
            <MessageContactPhone>{contact.phone}</MessageContactPhone>
          </MessageContactContent>
        </MessageContact>
      </MessageSentShape>
    </Link>
  )
}
