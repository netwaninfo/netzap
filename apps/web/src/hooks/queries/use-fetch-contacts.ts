import { api } from '@/services/api/client'
import { FetchPagination } from '@/utils/fetch-pagination'
import type {
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
  const { page, ...queryParams } = query

  const { data, ...rest } = useSuspenseInfiniteQuery({
    queryKey: ['contacts', params, queryParams],
    queryFn: ({ pageParam }) => {
      return api.contacts.fetch({
        params,
        query: { ...queryParams, page: pageParam },
      })
    },
    initialPageParam: page,
    getNextPageParam: page => FetchPagination.getNextPage(page.pagination),
    select({ pages }) {
      return pages.flatMap(page => page.data)
    },
  })

  const { error, isFetching } = rest

  if (error && !isFetching) {
    throw error
  }

  return [data, rest] as const
}

export { useFetchContacts }
