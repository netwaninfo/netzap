import { netzapAPI } from '@/services/container'
import type { FetchInstancesRequestQuery } from '@netzap/http/chat'
import { useSuspenseQuery } from '@tanstack/react-query'

interface UseFetchInstancesProps {
  query?: FetchInstancesRequestQuery
}

function useFetchInstances({ query = { page: 1 } }: UseFetchInstancesProps) {
  const { data, ...rest } = useSuspenseQuery({
    queryKey: ['instances', query],
    queryFn: () => netzapAPI.instances.fetch({ query }),
  })

  const { error, isFetching } = rest

  if (error && !isFetching) {
    throw error
  }

  return [data, rest] as const
}

export { useFetchInstances }
