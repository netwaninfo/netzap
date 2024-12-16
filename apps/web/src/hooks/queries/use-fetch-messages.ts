import { Message } from '@netzap/entities/chat'
import {
  FetchMessagesRequestParams,
  FetchMessagesRequestQuery,
  FetchMessagesResponseBody,
} from '@netzap/http/chat'
import {
  MessageChangeServerEventPayload,
  MessageCreateServerEventPayload,
  MessageRevokedServerEventPayload,
} from '@netzap/websocket/chat'
import {
  InfiniteData,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query'
import { useCallback } from 'react'

import { useSocketEvent } from '../socket/use-socket-event'

import { dayjs } from '@/lib/dayjs'
import { remeda } from '@/lib/remeda'

import { netzapAPI } from '@/services/container'
import { FetchPagination } from '@/utils/fetch-pagination'

interface CreateQueryKeyParams {
  params: FetchMessagesRequestParams
  query?: FetchMessagesRequestQuery
}

function createQueryKey({ params, query }: CreateQueryKeyParams) {
  return ['messages', params, query]
}

interface GroupMessage {
  date: Date
  messages: Message[]
}

interface UseFetchMessagesProps {
  params: FetchMessagesRequestParams
  query?: FetchMessagesRequestQuery
}

function useFetchMessages({
  params,
  query = { page: 1 },
}: UseFetchMessagesProps) {
  const queryClient = useQueryClient()

  const { data, ...rest } = useSuspenseInfiniteQuery({
    queryKey: createQueryKey({ params, query }),
    queryFn: ({ pageParam }) => {
      return netzapAPI.messages.fetch({
        params,
        query: { ...query, page: pageParam },
      })
    },
    initialPageParam: query.page,
    getNextPageParam: page => FetchPagination.getNextPage(page.pagination),
    select({ pages }) {
      const uniqueMessages = remeda
        .uniqueBy(
          pages.flatMap(page => page.data),
          item => item.id
        )
        .reverse()

      const groupedMessages = remeda.groupBy(uniqueMessages, item =>
        dayjs(item.createdAt).format('YYYY-MM-DD')
      )

      const groups: GroupMessage[] = Object.entries(groupedMessages).map(
        ([date, messages]) => ({
          date: dayjs(date).toDate(),
          messages,
        })
      )

      return groups
    },
  })

  const { error, isFetching } = rest

  if (error && !isFetching) {
    throw error
  }

  const createQueryKeyFromMessage = useCallback(
    (message: Message) => {
      return createQueryKey({
        params: { instanceId: message.instanceId, waChatId: message.waChatId },
        query,
      })
    },
    [query]
  )

  const handleMessageCreate = useCallback(
    (payload: MessageCreateServerEventPayload) => {
      const { message } = payload

      queryClient.setQueryData<InfiniteData<FetchMessagesResponseBody>>(
        createQueryKeyFromMessage(message),
        prev => {
          if (!prev) return prev
          const currentPages = [...prev.pages]

          const firstPage = currentPages[0]
          firstPage.data.unshift(message)

          return { ...prev, pages: currentPages }
        }
      )
    },
    [queryClient, createQueryKeyFromMessage]
  )

  const handleMessageChangeOrRevoked = useCallback(
    (
      payload:
        | MessageChangeServerEventPayload
        | MessageRevokedServerEventPayload
    ) => {
      const { message } = payload

      queryClient.setQueryData<InfiniteData<FetchMessagesResponseBody>>(
        createQueryKeyFromMessage(message),
        prev => {
          if (!prev) return prev
          const previousPages = [...prev.pages]

          const updatedPages = previousPages.map(({ data, ...page }) => {
            const updatedData = data.map(item => {
              if (item.id !== message.id) return item

              return { ...item, ...message }
            })

            return { ...page, data: updatedData }
          })

          return { ...prev, pages: updatedPages }
        }
      )
    },
    [queryClient, createQueryKeyFromMessage]
  )

  useSocketEvent('message:create', handleMessageCreate, [])
  useSocketEvent('message:change', handleMessageChangeOrRevoked, [])
  useSocketEvent('message:revoked', handleMessageChangeOrRevoked, [])

  return [data, rest] as const
}

export { useFetchMessages, createQueryKey, type GroupMessage }
