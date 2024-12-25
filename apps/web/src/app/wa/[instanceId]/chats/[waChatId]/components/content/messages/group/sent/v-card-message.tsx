import type { GroupVCardMessage } from '@netzap/entities/chat'

import {
  MessageContent,
  MessageFooter,
} from '@/pages/instanceId/chats/[waChatId]/components/message'
import {
  MessageSent,
  MessageSentDate,
  MessageSentMediaBox,
} from '@/pages/instanceId/chats/[waChatId]/components/message-sent'
import { MessageStatus } from '@/pages/instanceId/chats/components/message-status'
import { SentContactItem } from '../../sent-contact-item'
import { useGroupMessage } from '../use-group-message'

interface SentGroupVCardMessageProps {
  message: GroupVCardMessage
}

export function SentGroupVCardMessage({ message }: SentGroupVCardMessageProps) {
  const { calendarDate } = useGroupMessage({ message })

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
