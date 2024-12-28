import type { PrivateRevokedMessage } from '@netzap/entities/chat'
import { Ban } from 'lucide-react'

import { MessageStatus } from '@/app/wa/[instanceId]/chats/components/message-status'
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
import { usePrivateMessage } from '../use-private-message'

interface SentPrivateRevokedMessageProps {
  message: PrivateRevokedMessage
}

export function SentPrivateRevokedMessage({
  message,
}: SentPrivateRevokedMessageProps) {
  const { calendarDate } = usePrivateMessage({ message })

  return (
    <MessageSent>
      <MessageSentBox>
        <MessageContent>
          <MessageGroup>
            <Ban className="size-4" />

            <MessageBody>
              Mensagem apagada
              <MessageBodySpacer />
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