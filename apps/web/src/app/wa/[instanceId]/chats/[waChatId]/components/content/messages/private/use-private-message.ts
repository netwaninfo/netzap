import type { PrivateMessage } from '@netzap/entities/chat'

import {
  type UseMessageItemProps,
  type UseMessageItemReturn,
  useMessageItem,
} from '../use-message-item'

interface usePrivateMessageProps extends UseMessageItemProps {
  message: PrivateMessage
}

interface UsePrivateMessageReturn extends UseMessageItemReturn {}

function usePrivateMessage({
  message,
}: usePrivateMessageProps): UsePrivateMessageReturn {
  const { calendarDate } = useMessageItem({ message })

  return {
    calendarDate,
  }
}

export { usePrivateMessage }
