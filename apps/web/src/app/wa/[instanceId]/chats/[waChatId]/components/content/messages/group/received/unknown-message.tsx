import type { GroupUnknownMessage } from '@netzap/entities/chat'
import { CircleHelp } from 'lucide-react'

import {
  MessageAuthor,
  MessageBody,
  MessageBodySpacer,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from '@/pages/instanceId/chats/[waChatId]/components/message'
import {
  MessageReceived,
  MessageReceivedBox,
  MessageReceivedDate,
} from '@/pages/instanceId/chats/[waChatId]/components/message-received'
import { useGroupMessage } from '../use-group-message'

interface ReceivedGroupUnknownMessageProps {
  message: GroupUnknownMessage
}

export function ReceivedGroupUnknownMessage({
  message,
}: ReceivedGroupUnknownMessageProps) {
  const { calendarDate, author } = useGroupMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedBox>
        <MessageContent>
          <MessageHeader>
            <MessageAuthor>{author}</MessageAuthor>
          </MessageHeader>

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
