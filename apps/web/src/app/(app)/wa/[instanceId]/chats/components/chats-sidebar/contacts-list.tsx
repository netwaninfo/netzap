'use client'

import { useIntersectionObserver } from '@uidotdev/usehooks'

import { Each } from '@/components/utilities/each'
import { useFetchContacts } from '@/hooks/queries/use-fetch-contacts'
import { useInstanceParams } from '@/hooks/use-instance-params'
import { useEffect } from 'react'
import { ContactItem } from './contact-item'
import { ContactsListWrapper } from './contacts-list-wrapper'

interface ContactsListProps {
  search?: string
  limit: number
}

export function ContactsList({ search, limit }: ContactsListProps) {
  const { instanceId } = useInstanceParams()
  const [data, { fetchNextPage, hasNextPage }] = useFetchContacts({
    params: { instanceId },
    query: { page: 1, ...(search?.trim() && { q: search }), limit },
  })

  const [triggerRef, entry] = useIntersectionObserver({
    threshold: 1,
  })

  const contacts = data.pages.flatMap(page => page.data)
  const isCanFetchNextPage = entry?.isIntersecting && hasNextPage

  useEffect(() => {
    if (isCanFetchNextPage) fetchNextPage()
  }, [isCanFetchNextPage, fetchNextPage])

  return (
    <ContactsListWrapper>
      <Each
        items={contacts}
        render={({ item }) => <ContactItem contact={item} />}
      />

      <span ref={triggerRef} />
    </ContactsListWrapper>
  )
}
