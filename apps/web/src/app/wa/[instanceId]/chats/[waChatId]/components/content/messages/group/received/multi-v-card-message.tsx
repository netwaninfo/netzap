import type { GroupMultiVCardMessage } from '@netzap/entities/chat'

import {
  MessageAuthor,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from '@/pages/instanceId/chats/[waChatId]/components/message'
import {
  MessageReceived,
  MessageReceivedDate,
  MessageReceivedMediaBox,
} from '@/pages/instanceId/chats/[waChatId]/components/message-received'
import { Each } from '@netzap/ui/components/utilities/each'
import { ReceivedContactItem } from '../../received-contact-item'
import { useGroupMessage } from '../use-group-message'

interface ReceivedGroupMultiVCardMessageProps {
  message: GroupMultiVCardMessage
}

export function ReceivedGroupMultiVCardMessage({
  message,
}: ReceivedGroupMultiVCardMessageProps) {
  const { calendarDate, author } = useGroupMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedMediaBox>
        <MessageContent className="mb-5">
          <MessageHeader>
            <MessageAuthor>{author}</MessageAuthor>
          </MessageHeader>

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
