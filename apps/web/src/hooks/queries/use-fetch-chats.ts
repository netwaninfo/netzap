import { remeda } from '@/lib/remeda'
import { netzapAPI } from '@/services/container'
import { FetchPagination } from '@/utils/fetch-pagination'
import type { Chat, Message } from '@netzap/entities/chat'
import type {
  FetchChatsRequestParams,
  FetchChatsRequestQuery,
  FetchChatsResponseBody,
} from '@netzap/http/chat'
import type {
  ChatChangeServerEventPayload,
  ChatCreateServerEventPayload,
  MessageChangeServerEventPayload,
  MessageCreateServerEventPayload,
  MessageRevokedServerEventPayload,
} from '@netzap/websocket/chat'
import {
  type InfiniteData,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query'
import { useCallback } from 'react'
import { useSocketEvent } from '../socket/use-socket-event'

interface CreateQueryKeyParams {
  params: FetchChatsRequestParams
  query?: FetchChatsRequestQuery
}

function createQueryKey({ params, query }: CreateQueryKeyParams) {
  return ['chats', params, query]
}

interface UseFetchChatsProps {
  params: FetchChatsRequestParams
  query?: FetchChatsRequestQuery
}

function useFetchChats({ params, query = { page: 1 } }: UseFetchChatsProps) {
  const queryClient = useQueryClient()

  const { data, ...rest } = useSuspenseInfiniteQuery({
    queryKey: createQueryKey({ params, query }),
    queryFn: ({ pageParam }) => {
      return netzapAPI.chats.fetch({
        params,
        query: { ...query, page: pageParam },
      })
    },
    initialPageParam: query.page,
    getNextPageParam: page => FetchPagination.getNextPage(page.pagination),
    select({ pages }) {
      return remeda.uniqueBy(
        pages.flatMap(page => page.data),
        item => item.id
      )
    },
  })

  const { error, isFetching } = rest

  if (error && !isFetching) {
    throw error
  }

  const createQueryKeyFromChat = useCallback(
    (chat: Chat) => {
      return createQueryKey({ params: { instanceId: chat.instanceId }, query })
    },
    [query]
  )

  const handleChatCreate = useCallback(
    (payload: ChatCreateServerEventPayload) => {
      const { chat } = payload

      queryClient.setQueryData<InfiniteData<FetchChatsResponseBody>>(
        createQueryKeyFromChat(chat),
        prev => {
          if (!prev) return prev
          const currentPages = [...prev.pages]

          const firstPage = currentPages[0]
          firstPage.data.unshift(chat)

          return { ...prev, pages: currentPages }
        }
      )
    },
    [queryClient, createQueryKeyFromChat]
  )

  const handleChatChange = useCallback(
    (payload: ChatChangeServerEventPayload) => {
      const { chat } = payload

      queryClient.setQueryData<InfiniteData<FetchChatsResponseBody>>(
        createQueryKeyFromChat(chat),
        prev => {
          if (!prev) return prev
          const previousPages = [...prev.pages]

          const updatedPages = previousPages.map(({ data, ...page }) => {
            const updatedData = data.map(item => {
              if (item.id !== chat.id) return item

              return { ...item, ...chat }
            })

            return { ...page, data: updatedData }
          })

          return { ...prev, pages: updatedPages }
        }
      )
    },
    [queryClient, createQueryKeyFromChat]
  )

  useSocketEvent('chat:create', handleChatCreate, [])
  useSocketEvent('chat:change', handleChatChange, [])

  const createQueryKeyFromMessage = useCallback(
    (message: Message) => {
      return createQueryKey({
        params: { instanceId: message.instanceId },
        query,
      })
    },
    [query]
  )

  const handleMessageCreate = useCallback(
    (payload: MessageCreateServerEventPayload) => {
      const { message } = payload

      queryClient.setQueryData<InfiniteData<FetchChatsResponseBody>>(
        createQueryKeyFromMessage(message),
        prev => {
          if (!prev) return prev
          const previousPages = [...prev.pages]

          const chat = previousPages
            .flatMap(item => item.data)
            .find(item => item.id === message.chatId)

          if (!chat) return prev

          const updatedPages = previousPages.map(({ data, ...page }) => {
            const updatedData = data.filter(item => item.id !== message.chatId)

            return { ...page, data: updatedData }
          })

          const firstPage = updatedPages.at(0)
          firstPage?.data.unshift({
            ...chat,
            lastMessage: { ...(chat.lastMessage ?? {}), ...message },
          } as Chat)

          return { ...prev, pages: updatedPages }
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

      queryClient.setQueryData<InfiniteData<FetchChatsResponseBody>>(
        createQueryKeyFromMessage(message),
        prev => {
          if (!prev) return prev
          const previousPages = [...prev.pages]

          const updatedPages = previousPages.map(({ data, ...page }) => {
            const updatedData = data.map(item => {
              if (item.id !== message.chatId) return item

              return {
                ...item,
                lastMessage: { ...(item.lastMessage ?? {}), ...message },
              }
            }) as FetchChatsResponseBody['data']

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

export { useFetchChats, createQueryKey }
