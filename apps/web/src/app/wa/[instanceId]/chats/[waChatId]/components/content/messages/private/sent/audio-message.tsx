import type { PrivateAudioMessage } from '@netzap/entities/chat'
import { HeadphoneOff } from 'lucide-react'

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
  MessageSentDate,
  MessageSentMediaBox,
} from '@/pages/instanceId/chats/[waChatId]/components/message-sent'
import { usePrivateMessage } from '../use-private-message'

interface SentPrivateAudioMessageProps {
  message: PrivateAudioMessage
}

export function SentPrivateAudioMessage({
  message,
}: SentPrivateAudioMessageProps) {
  const { calendarDate } = usePrivateMessage({ message })

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
              <HeadphoneOff className="size-4" />

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
