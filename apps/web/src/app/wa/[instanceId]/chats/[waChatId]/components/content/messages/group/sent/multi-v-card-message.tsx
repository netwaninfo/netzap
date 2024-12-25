import type { GroupMultiVCardMessage } from '@netzap/entities/chat'

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
import { MessageStatus } from '@/pages/instanceId/chats/components/message-status'
import { Each } from '@netzap/ui/components/utilities/each'
import { SentContactItem } from '../../sent-contact-item'
import { useGroupMessage } from '../use-group-message'

interface SentGroupMultiVCardMessageProps {
  message: GroupMultiVCardMessage
}

export function SentGroupMultiVCardMessage({
  message,
}: SentGroupMultiVCardMessageProps) {
  const { calendarDate } = useGroupMessage({ message })

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
