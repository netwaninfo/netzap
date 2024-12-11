import { Chat } from '@netzap/entities/chat'
import {
  FetchChatsRequestParams,
  FetchChatsRequestQuery,
  FetchChatsResponseBody,
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

interface UseFetchChatsProps {
  params: FetchChatsRequestParams
  query?: FetchChatsRequestQuery
}

function useFetchChats({ params, query = { page: 1 } }: UseFetchChatsProps) {
  const { page, ...queryParams } = query

  const QUERY_KEY = ['chats', params, queryParams]

  const queryClient = useQueryClient()
  const { socket } = useSocketContext()

  const { data, ...rest } = useSuspenseInfiniteQuery({
    queryKey: QUERY_KEY,
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

  const updateChatItem = useCallback(
    (chat: Chat) => {
      queryClient.setQueryData<InfiniteData<FetchChatsResponseBody>>(
        QUERY_KEY,
        prev => {
          if (!prev) return prev
          const prevPages = Array.from(prev.pages)

          const newPages = prevPages.map(({ data, ...page }) => ({
            ...page,
            data: data.filter(item => item.id !== chat.id),
          }))

          const firstPage = newPages.at(0)
          if (!firstPage) return prev

          firstPage.data.unshift(chat)

          return { ...prev, pages: newPages }
        }
      )
    },
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    [queryClient, QUERY_KEY]
  )

  useEffect(() => {
    socket.on('chat:create', ({ chat }) => updateChatItem(chat))
    socket.on('chat:change', ({ chat }) => updateChatItem(chat))

    return () => {
      socket.off('chat:create')
      socket.off('chat:change')
    }
  }, [socket, updateChatItem])

  return [data, rest] as const
}

export { useFetchChats }
