import type { PrivateAudioMessage } from '@netzap/entities/chat'
import { HeadphoneOff } from 'lucide-react'

import {
  MessageBody,
  MessageBodySpacer,
  MessageContent,
  MessageFooter,
  MessageGroup,
} from '@/pages/instanceId/chats/[waChatId]/components/message'
import {
  MessageReceived,
  MessageReceivedDate,
  MessageReceivedMediaBox,
} from '@/pages/instanceId/chats/[waChatId]/components/message-received'
import { usePrivateMessage } from '../use-private-message'

interface ReceivedPrivateAudioMessageProps {
  message: PrivateAudioMessage
}

export function ReceivedPrivateAudioMessage({
  message,
}: ReceivedPrivateAudioMessageProps) {
  const { calendarDate } = usePrivateMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedMediaBox>
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
            <MessageReceivedDate dateTime={calendarDate.datetime}>
              {calendarDate.text}
            </MessageReceivedDate>
          </MessageFooter>
        </MessageContent>
      </MessageReceivedMediaBox>
    </MessageReceived>
  )
}
