import { netzapAPI } from '@/services/container'
import { FetchPagination } from '@/utils/fetch-pagination'
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
  const { page, ...queryParams } = query

  const { data, ...rest } = useSuspenseInfiniteQuery({
    queryKey: ['messages', params, queryParams],
    queryFn: ({ pageParam }) => {
      return netzapAPI.messages.fetch({
        params,
        query: { ...queryParams, page: pageParam },
      })
    },
    initialPageParam: page,
    getNextPageParam: page => FetchPagination.getNextPage(page.pagination),
  })

  const { error, isFetching } = rest

  if (error && !isFetching) {
    throw error
  }

  return [data, rest] as const
}

export { useFetchMessages, type UseFetchMessagesProps }
