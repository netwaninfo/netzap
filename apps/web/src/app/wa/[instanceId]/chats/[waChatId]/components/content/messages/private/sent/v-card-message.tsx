import type { PrivateVCardMessage } from '@netzap/entities/chat'

import { MessageStatus } from '@/app/wa/[instanceId]/chats/components/message-status'
import {
  MessageContent,
  MessageFooter,
} from '@/pages/instanceId/chats/[waChatId]/components/message'
import {
  MessageSent,
  MessageSentDate,
  MessageSentMediaBox,
} from '@/pages/instanceId/chats/[waChatId]/components/message-sent'
import { SentContactItem } from '../../sent-contact-item'
import { usePrivateMessage } from '../use-private-message'

interface SentPrivateVCardMessageProps {
  message: PrivateVCardMessage
}

export function SentPrivateVCardMessage({
  message,
}: SentPrivateVCardMessageProps) {
  const { calendarDate } = usePrivateMessage({ message })

  return (
    <MessageSent>
      <MessageSentMediaBox>
        <MessageContent className="mb-5">
          <SentContactItem contact={message.contact} />

          <MessageFooter>
            <MessageSentDate dateTime={calendarDate.datetime}>
              {calendarDate.text}
            </MessageSentDate>

            <MessageStatus status={message.status} />
          </MessageFooter>
        </MessageContent>
      </MessageSentMediaBox>
    </MessageSent>
  )
}
