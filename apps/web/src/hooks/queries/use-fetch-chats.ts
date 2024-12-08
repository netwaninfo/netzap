import { netzapAPI } from '@/services/container'
import { FetchPagination } from '@/utils/fetch-pagination'
import {
  FetchChatsRequestParams,
  FetchChatsRequestQuery,
} from '@netzap/http/chat'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

interface UseFetchChatsProps {
  params: FetchChatsRequestParams
  query?: FetchChatsRequestQuery
}

function useFetchChats({ params, query = { page: 1 } }: UseFetchChatsProps) {
  const { page, ...queryParams } = query

  const { data, ...rest } = useSuspenseInfiniteQuery({
    queryKey: ['chats', params, queryParams],
    queryFn: ({ pageParam }) => {
      return netzapAPI.chats.fetch({
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

export { useFetchChats }
