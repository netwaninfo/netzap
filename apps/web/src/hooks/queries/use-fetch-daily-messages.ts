import { useCallback } from 'react'

import type { Message } from '@netzap/entities/chat'
import type {
  FetchMessagesRequestParams,
  FetchMessagesRequestQuery,
  FetchMessagesResponseBody,
} from '@netzap/http/chat'
import type {
  MessageChangeServerEventPayload,
  MessageCreateServerEventPayload,
  MessageRevokedServerEventPayload,
} from '@netzap/websocket/chat'
import {
  type InfiniteData,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query'

import { useSocketEvent } from '../socket/use-socket-event'

import { dayjs } from '@/lib/dayjs'
import { remeda } from '@/lib/remeda'

import { api } from '@/services/api/client'
import { FetchPagination } from '@/utils/fetch-pagination'

import { useSocketContext } from '@/app/wa/[instanceId]/providers/socket-provider'

interface CreateQueryKeyParams {
  params: FetchMessagesRequestParams
  query?: FetchMessagesRequestQuery
}

function createQueryKey({ params, query }: CreateQueryKeyParams) {
  return ['messages', params, query]
}

interface DailyMessages {
  date: Date
  messages: Message[]
}

interface UseFetchDailyMessagesProps {
  params: FetchMessagesRequestParams
  query?: FetchMessagesRequestQuery
}

function useFetchDailyMessages({
  params,
  query = { page: 1 },
}: UseFetchDailyMessagesProps) {
  const socket = useSocketContext()
  const queryClient = useQueryClient()

  const { data, ...rest } = useSuspenseInfiniteQuery({
    queryKey: createQueryKey({ params, query }),
    queryFn: ({ pageParam }) => {
      return api.messages.fetch({
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

      const dailyMessages: DailyMessages[] = Object.entries(
        groupedMessages
      ).map(([date, messages]) => ({
        date: dayjs(date).toDate(),
        messages,
      }))

      return dailyMessages
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

          return remeda.merge(prev, { pages: currentPages })
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

            return remeda.merge(page, { data: updatedData })
          })

          return remeda.merge(prev, { pages: updatedPages })
        }
      )
    },
    [queryClient, createQueryKeyFromMessage]
  )

  useSocketEvent(socket, 'message:create', handleMessageCreate)
  useSocketEvent(socket, 'message:change', handleMessageChangeOrRevoked)
  useSocketEvent(socket, 'message:revoked', handleMessageChangeOrRevoked)

  return [data, rest] as const
}

export { useFetchDailyMessages, createQueryKey, type DailyMessages }
