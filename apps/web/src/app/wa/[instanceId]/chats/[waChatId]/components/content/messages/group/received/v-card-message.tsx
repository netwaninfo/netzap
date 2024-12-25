import type { GroupVCardMessage } from '@netzap/entities/chat'

import {
  MessageAuthor,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from '@/pages/instanceId/chats/[waChatId]/components/message'
import {
  MessageReceived,
  MessageReceivedDate,
  MessageReceivedMediaBox,
} from '@/pages/instanceId/chats/[waChatId]/components/message-received'
import { ReceivedContactItem } from '../../received-contact-item'
import { useGroupMessage } from '../use-group-message'

interface ReceivedGroupVCardMessageProps {
  message: GroupVCardMessage
}

export function ReceivedGroupVCardMessage({
  message,
}: ReceivedGroupVCardMessageProps) {
  const { calendarDate, author } = useGroupMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedMediaBox>
        <MessageContent className="mb-5">
          <MessageHeader>
            <MessageAuthor>{author}</MessageAuthor>
          </MessageHeader>

          <ReceivedContactItem contact={message.contact} />

          <MessageFooter>
            <MessageReceivedDate dateTime={calendarDate.datetime}>
              {calendarDate.text}
            </MessageReceivedDate>
          </MessageFooter>
        </MessageContent>
      </MessageReceivedMediaBox>
    </MessageReceived>
  )
}
