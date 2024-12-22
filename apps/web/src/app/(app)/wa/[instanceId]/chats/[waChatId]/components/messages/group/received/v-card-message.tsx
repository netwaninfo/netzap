import {
  MessageAuthor,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from '@/pages/chat/components/ui/message'
import {
  MessageReceived,
  MessageReceivedDate,
  MessageReceivedMediaBox,
} from '@/pages/chat/components/ui/message-received'
import { useGroupMessage } from '@/pages/chat/hooks/use-group-message'
import type { GroupVCardMessage } from '@netzap/entities/chat'
import { ReceivedContactItem } from '../../received-contact-item'

interface ReceivedGroupVCardMessageProps {
  message: GroupVCardMessage
}

export function ReceivedGroupVCardMessage({
  message,
}: ReceivedGroupVCardMessageProps) {
  const { formattedDate, author } = useGroupMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedMediaBox>
        <MessageContent className="mb-5">
          <MessageHeader>
            <MessageAuthor>{author}</MessageAuthor>
          </MessageHeader>

          <ReceivedContactItem contact={message.contact} />

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
