import type { FetchInstancesRequestQuery } from '@netzap/http/chat'
import { useSuspenseQuery } from '@tanstack/react-query'

import { api } from '@/services/api/client'

interface UseFetchInstancesProps {
  query?: FetchInstancesRequestQuery
}

function useFetchInstances({ query = { page: 1 } }: UseFetchInstancesProps) {
  const { data, ...rest } = useSuspenseQuery({
    queryKey: ['instances', query],
    queryFn: () => api.instances.fetch({ query }),
  })

  const { error, isFetching } = rest

  if (error && !isFetching) {
    throw error
  }

  return [data, rest] as const
}

export { useFetchInstances }
