import { netzapAPI } from '@/services/container'
import {
  FetchContactsRequestParams,
  FetchContactsRequestQuery,
} from '@netzap/http/chat'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

interface UseFetchContactsProps {
  params: FetchContactsRequestParams
  query?: FetchContactsRequestQuery
}

function useFetchContacts({
  params,
  query = { page: 1 },
}: UseFetchContactsProps) {
  const { data, ...rest } = useSuspenseInfiniteQuery({
    queryKey: ['contacts', params, query],
    queryFn: () => netzapAPI.contacts.fetch({ params, query }),
    initialPageParam: query.page,
    getNextPageParam: page => page.pagination.next,
    getPreviousPageParam: page => page.pagination.prev,
  })

  const { error, isFetching } = rest

  if (error && !isFetching) {
    throw error
  }

  return [data, rest] as const
}

export { useFetchContacts }