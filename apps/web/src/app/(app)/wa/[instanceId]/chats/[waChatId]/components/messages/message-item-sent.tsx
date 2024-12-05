import { Message as MessageEntity } from '@netzap/entities/chat'
import { useMessageItem } from '../../hooks/use-message-item'
import { MessageBody } from '../ui/message'
import {
  MessageSent,
  MessageSentContent,
  MessageSentDate,
} from '../ui/message-sent'

interface MessageItemSentProps {
  message: MessageEntity
}

export function MessageItemSent({ message }: MessageItemSentProps) {
  const { formattedDate } = useMessageItem({ message })

  return (
    <MessageSent>
      <MessageSentContent>
        <MessageBody>Not bad, just working on a new project. You?</MessageBody>

        <MessageSentDate dateTime={formattedDate.datetime}>
          {formattedDate.display}
        </MessageSentDate>
      </MessageSentContent>
    </MessageSent>
  )
}
