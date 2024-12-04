import { netzapAPI } from '@/services/container'
import { GetChatRequestParams } from '@netzap/http/chat'
import { useSuspenseQuery } from '@tanstack/react-query'

interface UseGetChatParams {
  params: GetChatRequestParams
}

function useGetChat({ params }: UseGetChatParams) {
  const { data, ...rest } = useSuspenseQuery({
    queryKey: ['chats', params],
    queryFn: () => netzapAPI.chats.get({ params }),
  })

  const { error, isFetching } = rest

  if (error && !isFetching) {
    throw error
  }

  return [data, rest] as const
}

export { useGetChat }
