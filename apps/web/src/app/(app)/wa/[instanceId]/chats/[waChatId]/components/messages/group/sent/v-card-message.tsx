import {
  MessageContent,
  MessageFooter,
} from '@/pages/chat/components/ui/message'
import {
  MessageSent,
  MessageSentDate,
  MessageSentMediaBox,
} from '@/pages/chat/components/ui/message-sent'
import { useGroupMessage } from '@/pages/chat/hooks/use-group-message'
import { GroupVCardMessage } from '@netzap/entities/chat'
import { MessageStatus } from '../../../../../components/messages/message-status'
import { SentContactItem } from '../../sent-contact-item'

interface SentGroupVCardMessageProps {
  message: GroupVCardMessage
}

export function SentGroupVCardMessage({ message }: SentGroupVCardMessageProps) {
  const { formattedDate } = useGroupMessage({ message })

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
