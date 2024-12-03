import { netzapAPI } from '@/services/container'
import {
  FetchChatsRequestParams,
  FetchChatsRequestQuery,
} from '@netzap/http/chat'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

interface UseFetchChatsParams {
  params: FetchChatsRequestParams
  query: FetchChatsRequestQuery
}

function useFetchChats({ params, query = { page: 1 } }: UseFetchChatsParams) {
  const { data, ...rest } = useSuspenseInfiniteQuery({
    queryKey: ['chats', params, query],
    queryFn: () => netzapAPI.chats.fetch({ params, query }),
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

export { useFetchChats }
