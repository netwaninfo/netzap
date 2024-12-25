import type { GroupMessage } from '@netzap/entities/chat'

import { useNameOfAuthor } from '@/hooks/use-name-of-author'
import {
  type UseMessageItemProps,
  type UseMessageItemReturn,
  useMessageItem,
} from '../use-message-item'

interface useGroupMessageProps extends UseMessageItemProps {
  message: GroupMessage
}

interface UseGroupMessageReturn extends UseMessageItemReturn {
  author: string
}

function useGroupMessage({
  message,
}: useGroupMessageProps): UseGroupMessageReturn {
  const { calendarDate } = useMessageItem({ message })
  const author = useNameOfAuthor(message.author)

  return {
    calendarDate,
    author,
  }
}

export { useGroupMessage }
