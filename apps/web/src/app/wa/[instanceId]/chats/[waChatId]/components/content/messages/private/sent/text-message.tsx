import type { PrivateTextMessage } from '@netzap/entities/chat'

import { MessageStatus } from '@/app/wa/[instanceId]/chats/components/message-status'
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
import { usePrivateMessage } from '../use-private-message'

interface SentPrivateTextMessageProps {
  message: PrivateTextMessage
}

export function SentPrivateTextMessage({
  message,
}: SentPrivateTextMessageProps) {
  const { calendarDate } = usePrivateMessage({ message })

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
