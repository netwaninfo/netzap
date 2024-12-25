import type { PrivateTextMessage } from '@netzap/entities/chat'

import {
  MessageBody,
  MessageBodySpacer,
  MessageContent,
  MessageFooter,
} from '@/pages/instanceId/chats/[waChatId]/components/message'
import {
  MessageReceived,
  MessageReceivedBox,
  MessageReceivedDate,
} from '@/pages/instanceId/chats/[waChatId]/components/message-received'
import { usePrivateMessage } from '../use-private-message'

interface ReceivedPrivateTextMessageProps {
  message: PrivateTextMessage
}

export function ReceivedPrivateTextMessage({
  message,
}: ReceivedPrivateTextMessageProps) {
  const { calendarDate } = usePrivateMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedBox>
        <MessageContent>
          <MessageBody>
            {message.body}

            <MessageBodySpacer />
          </MessageBody>

          <MessageFooter>
            <MessageReceivedDate dateTime={calendarDate.datetime}>
              {calendarDate.text}
            </MessageReceivedDate>
          </MessageFooter>
        </MessageContent>
      </MessageReceivedBox>
    </MessageReceived>
  )
}
