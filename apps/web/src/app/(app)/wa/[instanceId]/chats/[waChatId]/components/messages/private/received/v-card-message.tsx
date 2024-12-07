import {
  MessageContent,
  MessageFooter,
} from '@/pages/chat/components/ui/message'
import {
  MessageReceived,
  MessageReceivedDate,
  MessageReceivedMediaBox,
} from '@/pages/chat/components/ui/message-received'
import { useMessage } from '@/pages/chat/hooks/use-message'
import { PrivateVCardMessage } from '@netzap/entities/chat'
import { ReceivedContactItem } from '../../received-contact-item'

interface ReceivedPrivateVCardMessageProps {
  message: PrivateVCardMessage
}

export function ReceivedPrivateVCardMessage({
  message,
}: ReceivedPrivateVCardMessageProps) {
  const { formattedDate } = useMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedMediaBox>
        <MessageContent className="mb-5">
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
