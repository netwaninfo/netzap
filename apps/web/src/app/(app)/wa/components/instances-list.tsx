'use client'

import { Each } from '@/components/utilities/each'
import { useFetchInstances } from '@/hooks/queries/use-fetch-instances'
import { InstanceItem } from './instance-item'

export function InstancesList() {
  const [{ data: instances }] = useFetchInstances({ query: { page: 1 } })

  return (
    <Each
      items={instances}
      render={({ item }) => <InstanceItem item={item} />}
    />
  )
}
