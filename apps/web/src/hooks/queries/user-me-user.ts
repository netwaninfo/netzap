import { usersAPI } from '@/services/netzap/container'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useMeUser() {
  const { data, ...rest } = useSuspenseQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersAPI.getMe(),
  })

  const { error, isFetching } = rest

  if (error && !isFetching) {
    throw error
  }

  return [data, rest] as const
}
