import type { PrivateUnknownMessage } from '@netzap/entities/chat'
import { CircleHelp } from 'lucide-react'

import {
  MessageBody,
  MessageBodySpacer,
  MessageContent,
  MessageFooter,
  MessageGroup,
} from '@/pages/instanceId/chats/[waChatId]/components/message'
import {
  MessageReceived,
  MessageReceivedBox,
  MessageReceivedDate,
} from '@/pages/instanceId/chats/[waChatId]/components/message-received'
import { usePrivateMessage } from '../use-private-message'

interface ReceivedPrivateUnknownMessageProps {
  message: PrivateUnknownMessage
}

export function ReceivedPrivateUnknownMessage({
  message,
}: ReceivedPrivateUnknownMessageProps) {
  const { calendarDate } = usePrivateMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedBox>
        <MessageContent>
          <MessageGroup>
            <CircleHelp className="size-4" />

            <MessageBody>
              Mensagem não disponível <MessageBodySpacer />
            </MessageBody>
          </MessageGroup>

          <MessageFooter>
            <MessageReceivedDate dateTime={calendarDate.datetime}>
              {calendarDate.text}
            </MessageReceivedDate>
          </MessageFooter>
        </MessageContent>
      </MessageReceivedBox>
    </MessageReceived>
  )
}
