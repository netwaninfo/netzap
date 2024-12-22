import { dayjs } from '@/lib/dayjs'
import { getMessageAuthorName } from '@/utils/get-message-author-name'
import type { GroupMessage } from '@netzap/entities/chat'
import type { UseMessageReturn, useMessageProps } from './use-message'

interface useGroupMessageProps extends useMessageProps {
  message: GroupMessage
}

interface UseGroupMessageReturn extends UseMessageReturn {
  author: string
}

function useGroupMessage({
  message,
}: useGroupMessageProps): UseGroupMessageReturn {
  const author = getMessageAuthorName(message.author)
  const dateRef = dayjs(message.createdAt)

  const formattedDate = {
    datetime: dateRef.toISOString(),
    display: dateRef.format('HH:mm'),
  }

  return {
    formattedDate,
    author,
  }
}

export { useGroupMessage }
