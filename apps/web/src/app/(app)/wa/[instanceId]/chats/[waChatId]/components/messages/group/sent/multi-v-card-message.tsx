import type { GroupMultiVCardMessage } from '@netzap/entities/chat'

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
import { useGroupMessage } from '@/pages/chat/hooks/use-group-message'
import { MessageStatus } from '../../../../../components/messages/message-status'
import { SentContactItem } from '../../sent-contact-item'

interface SentGroupMultiVCardMessageProps {
  message: GroupMultiVCardMessage
}

export function SentGroupMultiVCardMessage({
  message,
}: SentGroupMultiVCardMessageProps) {
  const { formattedDate } = useGroupMessage({ message })

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
