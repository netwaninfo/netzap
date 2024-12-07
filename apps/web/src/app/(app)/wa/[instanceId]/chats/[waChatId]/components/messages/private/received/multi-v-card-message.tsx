import { PrivateMultiVCardMessage } from '@netzap/entities/chat'

import { Each } from '@/components/utilities/each'
import {
  MessageContent,
  MessageFooter,
  MessageGroup,
} from '@/pages/chat/components/ui/message'
import {
  MessageReceived,
  MessageReceivedDate,
  MessageReceivedMediaBox,
} from '@/pages/chat/components/ui/message-received'
import { useMessage } from '@/pages/chat/hooks/use-message'
import { ReceivedContactItem } from '../../received-contact-item'

interface ReceivedPrivateMultiVCardMessageProps {
  message: PrivateMultiVCardMessage
}

export function ReceivedPrivateMultiVCardMessage({
  message,
}: ReceivedPrivateMultiVCardMessageProps) {
  const { formattedDate } = useMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedMediaBox>
        <MessageContent className="mb-5">
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
