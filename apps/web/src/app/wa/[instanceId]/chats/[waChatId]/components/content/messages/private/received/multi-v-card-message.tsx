import type { PrivateMultiVCardMessage } from '@netzap/entities/chat'

import {
  MessageContent,
  MessageFooter,
  MessageGroup,
} from '@/pages/instanceId/chats/[waChatId]/components/message'
import {
  MessageReceived,
  MessageReceivedDate,
  MessageReceivedMediaBox,
} from '@/pages/instanceId/chats/[waChatId]/components/message-received'
import { Each } from '@netzap/ui/components/utilities/each'
import { ReceivedContactItem } from '../../received-contact-item'
import { usePrivateMessage } from '../use-private-message'

interface ReceivedPrivateMultiVCardMessageProps {
  message: PrivateMultiVCardMessage
}

export function ReceivedPrivateMultiVCardMessage({
  message,
}: ReceivedPrivateMultiVCardMessageProps) {
  const { calendarDate } = usePrivateMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedMediaBox>
        <MessageContent className="mb-5">
          <MessageGroup className="block space-x-0 space-y-2">
            <Each
              items={message.contacts}
              render={item => (
                <ReceivedContactItem contact={item} key={item.id} />
              )}
            />
          </MessageGroup>

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
