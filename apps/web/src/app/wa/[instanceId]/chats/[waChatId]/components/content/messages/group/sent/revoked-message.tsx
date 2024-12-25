import type { GroupRevokedMessage } from '@netzap/entities/chat'
import { Ban } from 'lucide-react'

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
import { useGroupMessage } from '../use-group-message'

interface SentGroupRevokedMessageProps {
  message: GroupRevokedMessage
}

export function SentGroupRevokedMessage({
  message,
}: SentGroupRevokedMessageProps) {
  const { calendarDate } = useGroupMessage({ message })

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
          </MessageFooter>
        </MessageContent>
      </MessageSentBox>
    </MessageSent>
  )
}
