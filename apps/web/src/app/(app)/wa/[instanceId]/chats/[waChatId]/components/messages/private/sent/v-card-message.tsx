import {
  MessageContent,
  MessageFooter,
} from '@/pages/chat/components/ui/message'
import {
  MessageSent,
  MessageSentDate,
  MessageSentMediaBox,
} from '@/pages/chat/components/ui/message-sent'
import { useMessage } from '@/pages/chat/hooks/use-message'
import { MessageStatus } from '@/pages/chats/components/messages/message-status'
import { PrivateVCardMessage } from '@netzap/entities/chat'
import { SentContactItem } from '../../sent-contact-item'

interface SentPrivateVCardMessageProps {
  message: PrivateVCardMessage
}

export function SentPrivateVCardMessage({
  message,
}: SentPrivateVCardMessageProps) {
  const { formattedDate } = useMessage({ message })

  return (
    <MessageSent>
      <MessageSentMediaBox>
        <MessageContent className="mb-5">
          <SentContactItem contact={message.contact} />

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
