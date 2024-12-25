import type { GroupTextMessage } from '@netzap/entities/chat'

import {
  MessageAuthor,
  MessageBody,
  MessageBodySpacer,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from '@/pages/instanceId/chats/[waChatId]/components/message'
import {
  MessageReceived,
  MessageReceivedBox,
  MessageReceivedDate,
} from '@/pages/instanceId/chats/[waChatId]/components/message-received'
import { useGroupMessage } from '../use-group-message'

interface ReceivedGroupTextMessageProps {
  message: GroupTextMessage
}

export function ReceivedGroupTextMessage({
  message,
}: ReceivedGroupTextMessageProps) {
  const { calendarDate, author } = useGroupMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedBox>
        <MessageContent>
          <MessageHeader>
            <MessageAuthor>{author}</MessageAuthor>
          </MessageHeader>

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
