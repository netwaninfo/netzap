import { netzapAPI } from '@/services/container'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useGetMe() {
  const { data, ...rest } = useSuspenseQuery({
    queryKey: ['users', 'me'],
    queryFn: () => netzapAPI.users.getMe(),
  })

  const { error, isFetching } = rest

  if (error && !isFetching) {
    throw error
  }

  return [data, rest] as const
}
