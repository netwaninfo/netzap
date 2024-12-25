import type { PrivateVCardMessage } from '@netzap/entities/chat'

import {
  MessageContent,
  MessageFooter,
} from '@/pages/instanceId/chats/[waChatId]/components/message'
import {
  MessageReceived,
  MessageReceivedDate,
  MessageReceivedMediaBox,
} from '@/pages/instanceId/chats/[waChatId]/components/message-received'
import { ReceivedContactItem } from '../../received-contact-item'
import { usePrivateMessage } from '../use-private-message'

interface ReceivedPrivateVCardMessageProps {
  message: PrivateVCardMessage
}

export function ReceivedPrivateVCardMessage({
  message,
}: ReceivedPrivateVCardMessageProps) {
  const { calendarDate } = usePrivateMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedMediaBox>
        <MessageContent className="mb-5">
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
