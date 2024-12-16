'use client'

import { Contact as ContactEntity } from '@netzap/entities/chat'

import { User } from 'lucide-react'

import { SheetClose } from '@/components/ui/sheet'
import { useInstanceParams } from '@/hooks/use-instance-params'
import { remeda } from '@/lib/remeda'
import { useRouter } from 'next/navigation'
import {
  Contact,
  ContactAvatar,
  ContactAvatarFallback,
  ContactAvatarImage,
  ContactContent,
  ContactName,
  ContactPhone,
} from '../ui/contact'

interface ContactItemProps {
  contact: ContactEntity
}

export function ContactItem({ contact }: ContactItemProps) {
  const router = useRouter()
  const { instanceId } = useInstanceParams()

  async function handleSelect() {
    remeda
      .debounce(
        () => router.push(`/wa/${instanceId}/chats/${contact.waContactId}`),
        { waitMs: 150 }
      )
      .call()
  }

  return (
    <SheetClose asChild>
      <Contact onClick={handleSelect}>
        <ContactAvatar>
          {contact.imageUrl && (
            <ContactAvatarImage src={contact.imageUrl} alt="" />
          )}

          <ContactAvatarFallback>
            <User className="size-5 text-muted-foreground" />
          </ContactAvatarFallback>
        </ContactAvatar>

        <ContactContent>
          <ContactName>{contact.name}</ContactName>
          <ContactPhone>{contact.phone}</ContactPhone>
        </ContactContent>
      </Contact>
    </SheetClose>
  )
}
