import { PrivateMultiVCardMessage } from '@netzap/entities/chat'

import { Each } from '@/components/utilities/each'
import {
  MessageContent,
  MessageFooter,
  MessageGroup,
} from '@/pages/chat/components/ui/message'
import {
  MessageSent,
  MessageSentDate,
  MessageSentMediaBox,
} from '@/pages/chat/components/ui/message-sent'
import { useMessage } from '@/pages/chat/hooks/use-message'
import { MessageStatus } from '@/pages/chats/components/messages/message-status'
import { SentContactItem } from '../../sent-contact-item'

interface SentPrivateMultiVCardMessageProps {
  message: PrivateMultiVCardMessage
}

export function SentPrivateMultiVCardMessage({
  message,
}: SentPrivateMultiVCardMessageProps) {
  const { formattedDate } = useMessage({ message })

  return (
    <MessageSent>
      <MessageSentMediaBox>
        <MessageContent className="mb-5">
          <MessageGroup className="block space-x-0 space-y-2">
            <Each
              items={message.contacts}
              render={({ item }) => <SentContactItem contact={item} />}
            />
          </MessageGroup>

          <MessageFooter>
            <MessageSentDate dateTime={formattedDate.datetime}>
              {formattedDate.display}
            </MessageSentDate>

            <MessageStatus status={message.status} />
          </MessageFooter>
        </MessageContent>
      </MessageSentMediaBox>
    </MessageSent>
  )
}
