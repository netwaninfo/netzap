'use client'

import { Each } from '@netzap/ui/components/utilities/each'

import { FETCH_LIMIT } from '@/consts'

import { useFetchInstances } from '@/hooks/queries/use-fetch-instances'
import { InstanceItem } from './instance-item'

export function InstancesList() {
  const [{ data: instances }] = useFetchInstances({
    query: { page: 1, status: 'connected', limit: FETCH_LIMIT },
  })

  return (
    <Each
      items={instances}
      render={item => <InstanceItem item={item} key={item.id} />}
    />
  )
}
