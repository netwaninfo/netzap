import { netzapAPI } from '@/services/container'
import type { GetChatRequestParams } from '@netzap/http/chat'
import { useSuspenseQuery } from '@tanstack/react-query'

interface UseGetChatProps {
  params: GetChatRequestParams
}

function useGetChat({ params }: UseGetChatProps) {
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
