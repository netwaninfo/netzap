import { dayjs } from '@/lib/dayjs'
import { Message } from '@netzap/entities/chat'

interface useMessageItemProps {
  message: Message
}

function useMessageItem({ message }: useMessageItemProps) {
  const dateRef = dayjs(message.createdAt)

  const formattedDate = {
    datetime: dateRef.toISOString(),
    display: dateRef.format('HH:mm'),
  }

  return {
    formattedDate,
  }
}

export { useMessageItem }
