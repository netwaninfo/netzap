import { PrivateTextMessage } from '@netzap/entities/chat'

import {
  MessageBody,
  MessageContent,
  MessageFooter,
} from '@/pages/chat/components/ui/message'
import {
  MessageSent,
  MessageSentBox,
  MessageSentDate,
} from '@/pages/chat/components/ui/message-sent'
import { useMessage } from '@/pages/chat/hooks/use-message'
import { MessageStatus } from '@/pages/chats/components/messages/message-status'

interface SentPrivateTextMessageProps {
  message: PrivateTextMessage
}

export function SentPrivateTextMessage({
  message,
}: SentPrivateTextMessageProps) {
  const { formattedDate } = useMessage({ message })

  return (
    <MessageSent>
      <MessageSentBox>
        <MessageContent>
          <MessageBody>{message.body}</MessageBody>

          <MessageFooter>
            <MessageSentDate dateTime={formattedDate.datetime}>
              {formattedDate.display}
            </MessageSentDate>

            <MessageStatus status={message.status} />
          </MessageFooter>
        </MessageContent>
      </MessageSentBox>
    </MessageSent>
  )
}
