'use client'

import { useCallback } from 'react'

import { remeda } from '@/lib/remeda'

import { useFetchContacts } from '@/hooks/queries/use-fetch-contacts'
import { useInstanceParams } from '@/hooks/use-instance-params'

import { Each } from '@netzap/ui/components/utilities/each'
import {
  InfiniteScroll,
  InfiniteScrollTrigger,
} from '@netzap/ui/components/utilities/infinite-scroll'

import { ContactItem } from './contact-item'

interface ContactsListProps {
  search?: string
  limit: number
}

export function ContactsList({ search, limit }: ContactsListProps) {
  const { instanceId } = useInstanceParams()

  const [contacts, { fetchNextPage, hasNextPage }] = useFetchContacts({
    params: { instanceId },
    query: {
      page: 1,
      ...(!remeda.isEmpty(search) && { q: search }),
      limit,
    },
  })

  const handleReachEnd = useCallback(() => {
    if (hasNextPage) fetchNextPage()
  }, [hasNextPage, fetchNextPage])

  return (
    <InfiniteScroll onReachEnd={handleReachEnd}>
      <Each
        items={contacts}
        render={item => <ContactItem contact={item} key={item.id} />}
      />

      <InfiniteScrollTrigger />
    </InfiniteScroll>
  )
}
