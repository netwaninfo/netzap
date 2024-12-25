import type { GroupUnknownMessage } from '@netzap/entities/chat'
import { CircleHelp } from 'lucide-react'

import {
  MessageBody,
  MessageBodySpacer,
  MessageContent,
  MessageFooter,
  MessageGroup,
} from '@/pages/instanceId/chats/[waChatId]/components/message'
import {
  MessageSent,
  MessageSentBox,
  MessageSentDate,
} from '@/pages/instanceId/chats/[waChatId]/components/message-sent'

import { MessageStatus } from '@/pages/instanceId/chats/components/message-status'
import { useGroupMessage } from '../use-group-message'

interface SentGroupUnknownMessageProps {
  message: GroupUnknownMessage
}

export function SentGroupUnknownMessage({
  message,
}: SentGroupUnknownMessageProps) {
  const { calendarDate } = useGroupMessage({ message })

  return (
    <MessageSent>
      <MessageSentBox>
        <MessageContent>
          <MessageGroup>
            <CircleHelp className="size-4" />

            <MessageBody>
              Mensagem não disponível <MessageBodySpacer />
            </MessageBody>
          </MessageGroup>

          <MessageFooter>
            <MessageSentDate dateTime={calendarDate.datetime}>
              {calendarDate.text}
            </MessageSentDate>

            <MessageStatus status={message.status} />
          </MessageFooter>
        </MessageContent>
      </MessageSentBox>
    </MessageSent>
  )
}
