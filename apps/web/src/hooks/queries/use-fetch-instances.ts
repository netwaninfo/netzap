import { netzapAPI } from '@/services/container'
import { FetchInstancesRequestQuery } from '@netzap/http/chat'
import { useSuspenseQuery } from '@tanstack/react-query'

interface UseFetchInstancesParams {
  query: FetchInstancesRequestQuery
}

function useFetchInstances({ query }: UseFetchInstancesParams) {
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
