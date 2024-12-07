import { PrivateTextMessage } from '@netzap/entities/chat'

import {
  MessageBody,
  MessageBodySpacer,
  MessageContent,
  MessageFooter,
} from '@/pages/chat/components/ui/message'
import {
  MessageReceived,
  MessageReceivedBox,
  MessageReceivedDate,
} from '@/pages/chat/components/ui/message-received'
import { useMessage } from '@/pages/chat/hooks/use-message'

interface ReceivedPrivateTextMessageProps {
  message: PrivateTextMessage
}

export function ReceivedPrivateTextMessage({
  message,
}: ReceivedPrivateTextMessageProps) {
  const { formattedDate } = useMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedBox>
        <MessageContent>
          <MessageBody>
            {message.body}

            <MessageBodySpacer />
          </MessageBody>

          <MessageFooter>
            <MessageReceivedDate dateTime={formattedDate.datetime}>
              {formattedDate.display}
            </MessageReceivedDate>
          </MessageFooter>
        </MessageContent>
      </MessageReceivedBox>
    </MessageReceived>
  )
}
