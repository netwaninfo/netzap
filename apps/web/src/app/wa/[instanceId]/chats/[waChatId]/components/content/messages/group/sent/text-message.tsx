import type { GroupTextMessage } from '@netzap/entities/chat'

import {
  MessageBody,
  MessageBodySpacer,
  MessageContent,
  MessageFooter,
} from '@/pages/instanceId/chats/[waChatId]/components/message'
import {
  MessageSent,
  MessageSentBox,
  MessageSentDate,
} from '@/pages/instanceId/chats/[waChatId]/components/message-sent'
import { MessageStatus } from '@/pages/instanceId/chats/components/message-status'
import { useGroupMessage } from '../use-group-message'

interface SentGroupTextMessageProps {
  message: GroupTextMessage
}

export function SentGroupTextMessage({ message }: SentGroupTextMessageProps) {
  const { calendarDate } = useGroupMessage({ message })

  return (
    <MessageSent>
      <MessageSentBox>
        <MessageContent>
          <MessageBody>
            {message.body}

            <MessageBodySpacer />
          </MessageBody>

          <MessageFooter>
            <MessageSentDate dateTime={calendarDate.datetime}>
              {calendarDate.text}
            </MessageSentDate>

            <MessageStatus status={message.status} />
          </MessageFooter>
        </MessageContent>
      </MessageSentBox>
    </MessageSent>
  )
}
