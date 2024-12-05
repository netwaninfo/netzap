import { netzapAPI } from '@/services/container'
import {
  FetchMessagesRequestParams,
  FetchMessagesRequestQuery,
} from '@netzap/http/chat'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

interface UseFetchMessagesProps {
  params: FetchMessagesRequestParams
  query?: FetchMessagesRequestQuery
}

function useFetchMessages({
  params,
  query = { page: 1 },
}: UseFetchMessagesProps) {
  const { data, ...rest } = useSuspenseInfiniteQuery({
    queryKey: ['messages', params, query],
    queryFn: () => netzapAPI.messages.fetch({ params, query }),
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

export { useFetchMessages, type UseFetchMessagesProps }
