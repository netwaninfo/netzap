import { api } from '@/services/api/client'
import { useSuspenseQuery } from '@tanstack/react-query'

function useGetAttendant() {
  const { data, ...rest } = useSuspenseQuery({
    queryKey: ['users', 'me'],
    queryFn: () => api.users.getMe(),
  })

  const { error, isFetching } = rest

  if (error && !isFetching) {
    throw error
  }

  return [data, rest] as const
}

export { useGetAttendant }
