import type { PrivateUnknownMessage } from '@netzap/entities/chat'
import { CircleHelp } from 'lucide-react'

import {
  MessageBody,
  MessageBodySpacer,
  MessageContent,
  MessageFooter,
  MessageGroup,
} from '@/pages/chat/components/ui/message'
import {
  MessageSent,
  MessageSentBox,
  MessageSentDate,
} from '@/pages/chat/components/ui/message-sent'
import { MessageStatus } from '@/pages/chats/components/messages/message-status'

import { useMessage } from '@/pages/chat/hooks/use-message'

interface SentPrivateUnknownMessageProps {
  message: PrivateUnknownMessage
}

export function SentPrivateUnknownMessage({
  message,
}: SentPrivateUnknownMessageProps) {
  const { formattedDate } = useMessage({ message })

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
