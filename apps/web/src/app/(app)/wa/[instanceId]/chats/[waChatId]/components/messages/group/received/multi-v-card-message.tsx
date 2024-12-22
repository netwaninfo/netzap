import type { GroupMultiVCardMessage } from '@netzap/entities/chat'

import { Each } from '@/components/utilities/each'
import {
  MessageAuthor,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from '@/pages/chat/components/ui/message'
import {
  MessageReceived,
  MessageReceivedDate,
  MessageReceivedMediaBox,
} from '@/pages/chat/components/ui/message-received'
import { useGroupMessage } from '@/pages/chat/hooks/use-group-message'
import { ReceivedContactItem } from '../../received-contact-item'

interface ReceivedGroupMultiVCardMessageProps {
  message: GroupMultiVCardMessage
}

export function ReceivedGroupMultiVCardMessage({
  message,
}: ReceivedGroupMultiVCardMessageProps) {
  const { formattedDate, author } = useGroupMessage({ message })

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
              render={({ item }) => <ReceivedContactItem contact={item} />}
            />
          </MessageGroup>

          <MessageFooter>
            <MessageReceivedDate dateTime={formattedDate.datetime}>
              {formattedDate.display}
            </MessageReceivedDate>
          </MessageFooter>
        </MessageContent>
      </MessageReceivedMediaBox>
    </MessageReceived>
  )
}
