import type { GroupVoiceMessage } from '@netzap/entities/chat'
import { MicOff } from 'lucide-react'

import {
  MessageBody,
  MessageBodySpacer,
  MessageContent,
  MessageFooter,
  MessageGroup,
} from '@/pages/instanceId/chats/[waChatId]/components/message'
import {
  MessageSent,
  MessageSentDate,
  MessageSentMediaBox,
} from '@/pages/instanceId/chats/[waChatId]/components/message-sent'

import { MessageStatus } from '@/pages/instanceId/chats/components/message-status'
import { useGroupMessage } from '../use-group-message'

interface SentGroupVoiceMessageProps {
  message: GroupVoiceMessage
}

export function SentGroupVoiceMessage({ message }: SentGroupVoiceMessageProps) {
  const { calendarDate } = useGroupMessage({ message })

  return (
    <MessageSent>
      <MessageSentMediaBox>
        <MessageContent>
          {message.media ? (
            <audio controls>
              <source src={message.media.url} type={message.media.mimeType} />
              <track kind="captions" />
            </audio>
          ) : (
            <MessageGroup>
              <MicOff className="size-4" />

              <MessageBody>
                Audio não disponível
                <MessageBodySpacer />
              </MessageBody>
            </MessageGroup>
          )}

          <MessageFooter>
            <MessageSentDate dateTime={calendarDate.datetime}>
              {calendarDate.text}
            </MessageSentDate>

            <MessageStatus status={message.status} />
          </MessageFooter>
        </MessageContent>
      </MessageSentMediaBox>
    </MessageSent>
  )
}
