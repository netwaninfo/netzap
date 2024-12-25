import type { PrivateMultiVCardMessage } from '@netzap/entities/chat'

import { MessageStatus } from '@/app/wa/[instanceId]/chats/components/message-status'
import {
  MessageContent,
  MessageFooter,
  MessageGroup,
} from '@/pages/instanceId/chats/[waChatId]/components/message'
import {
  MessageSent,
  MessageSentDate,
  MessageSentMediaBox,
} from '@/pages/instanceId/chats/[waChatId]/components/message-sent'
import { Each } from '@netzap/ui/components/utilities/each'
import { SentContactItem } from '../../sent-contact-item'
import { useMessageItem } from '../../use-message-item'

interface SentPrivateMultiVCardMessageProps {
  message: PrivateMultiVCardMessage
}

export function SentPrivateMultiVCardMessage({
  message,
}: SentPrivateMultiVCardMessageProps) {
  const { calendarDate } = useMessageItem({ message })

  return (
    <MessageSent>
      <MessageSentMediaBox>
        <MessageContent className="mb-5">
          <MessageGroup className="block space-x-0 space-y-2">
            <Each
              items={message.contacts}
              render={item => <SentContactItem contact={item} key={item.id} />}
            />
          </MessageGroup>

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
