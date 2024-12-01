'use client'

import { Each } from '@/components/utilities/each'
import { useFetchContacts } from '@/hooks/queries/use-fetch-contacts'
import { useInstanceParams } from '@/hooks/use-instance-params'
import { ContactItem } from './contact-item'

interface ContactsListProps {
  search?: string
}

export function ContactsList({ search }: ContactsListProps) {
  const { instanceId } = useInstanceParams()
  const [data] = useFetchContacts({
    params: { instanceId },
    query: { page: 1, ...(search?.trim() && { q: search }) },
  })

  const contacts = data.pages.flatMap(page => page.data)

  return (
    <Each
      items={contacts}
      render={({ item }) => <ContactItem contact={item} />}
    />
  )
}
