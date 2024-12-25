import type { GroupVoiceMessage } from '@netzap/entities/chat'
import { MicOff } from 'lucide-react'

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
  MessageReceivedDate,
  MessageReceivedMediaBox,
} from '@/pages/instanceId/chats/[waChatId]/components/message-received'
import { useGroupMessage } from '../use-group-message'

interface ReceivedGroupVoiceMessageProps {
  message: GroupVoiceMessage
}

export function ReceivedGroupVoiceMessage({
  message,
}: ReceivedGroupVoiceMessageProps) {
  const { calendarDate, author } = useGroupMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedMediaBox>
        <MessageContent>
          <MessageHeader>
            <MessageAuthor>{author}</MessageAuthor>
          </MessageHeader>

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
            <MessageReceivedDate dateTime={calendarDate.datetime}>
              {calendarDate.text}
            </MessageReceivedDate>
          </MessageFooter>
        </MessageContent>
      </MessageReceivedMediaBox>
    </MessageReceived>
  )
}
