import { Message } from '@netzap/entities/chat'
import {
  FetchMessagesRequestParams,
  FetchMessagesRequestQuery,
  FetchMessagesResponseBody,
} from '@netzap/http/chat'
import {
  InfiniteData,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'

import { useSocketContext } from '@/app/(app)/wa/[instanceId]/providers/socket-provider'
import { netzapAPI } from '@/services/container'
import { FetchPagination } from '@/utils/fetch-pagination'

interface UseFetchMessagesProps {
  params: FetchMessagesRequestParams
  query?: FetchMessagesRequestQuery
}

function useFetchMessages({
  params,
  query = { page: 1 },
}: UseFetchMessagesProps) {
  const { page, ...queryParams } = query
  const { waChatId } = params

  const QUERY_KEY = ['messages', params, queryParams]

  const queryClient = useQueryClient()
  const { socket } = useSocketContext()

  const { data, ...rest } = useSuspenseInfiniteQuery({
    queryKey: QUERY_KEY,
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

  const updateMessageItem = useCallback(
    (message: Message) => {
      if (message.waChatId !== waChatId) return

      queryClient.setQueryData<InfiniteData<FetchMessagesResponseBody>>(
        QUERY_KEY,
        prev => {
          if (!prev) return prev
          const prevPages = Array.from(prev.pages)

          const newPages = prevPages.map(({ data, ...page }) => ({
            ...page,
            data: data.map(item => {
              if (item.id !== message.id) return item

              return { ...item, ...message }
            }),
          }))

          return { ...prev, pages: newPages }
        }
      )
    },
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    [queryClient, waChatId, QUERY_KEY]
  )

  const createMessageItem = useCallback(
    (message: Message) => {
      if (message.waChatId !== waChatId) return

      queryClient.setQueryData<InfiniteData<FetchMessagesResponseBody>>(
        QUERY_KEY,
        prev => {
          if (!prev) return prev
          const prevPages = Array.from(prev.pages)

          const firstPage = prevPages.at(0)
          if (!firstPage) return prev

          firstPage.data.unshift(message)
          const newPages = [firstPage, ...prevPages.slice(1, prevPages.length)]

          return { ...prev, pages: newPages }
        }
      )
    },
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    [queryClient, waChatId, QUERY_KEY]
  )

  useEffect(() => {
    socket?.on('message:create', ({ message }) => createMessageItem(message))
    socket?.on('message:change', ({ message }) => updateMessageItem(message))
    socket?.on('message:revoked', ({ message }) => updateMessageItem(message))

    return () => {
      socket?.off('message:create')
      socket?.off('message:change')
      socket?.off('message:revoked')
    }
  }, [socket, updateMessageItem, createMessageItem])

  return [data, rest] as const
}

export { useFetchMessages, type UseFetchMessagesProps }
