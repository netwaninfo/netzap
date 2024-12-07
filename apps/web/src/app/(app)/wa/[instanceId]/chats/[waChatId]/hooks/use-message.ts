import { dayjs } from '@/lib/dayjs'
import { Message } from '@netzap/entities/chat'

interface useMessageProps {
  message: Message
}

interface UseMessageReturn {
  formattedDate: {
    datetime: string
    display: string
  }
}

function useMessage({ message }: useMessageProps): UseMessageReturn {
  const dateRef = dayjs(message.createdAt)

  const formattedDate = {
    datetime: dateRef.toISOString(),
    display: dateRef.format('HH:mm'),
  }

  return {
    formattedDate,
  }
}

export { useMessage, type useMessageProps, type UseMessageReturn }
