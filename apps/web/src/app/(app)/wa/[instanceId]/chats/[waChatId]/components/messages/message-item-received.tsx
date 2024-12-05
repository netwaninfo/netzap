import { Message as MessageEntity } from '@netzap/entities/chat'
import { useMessageItem } from '../../hooks/use-message-item'
import { MessageBody } from '../ui/message'
import {
  MessageReceived,
  MessageReceivedContent,
  MessageReceivedDate,
} from '../ui/message-received'

interface MessageItemReceivedProps {
  message: MessageEntity
}

export function MessageItemReceived({ message }: MessageItemReceivedProps) {
  const { formattedDate } = useMessageItem({ message })

  return (
    <MessageReceived>
      <MessageReceivedContent>
        <MessageBody>Hey, how's it going?</MessageBody>

        <MessageReceivedDate dateTime={formattedDate.datetime}>
          {formattedDate.display}
        </MessageReceivedDate>
      </MessageReceivedContent>
    </MessageReceived>
  )
}
