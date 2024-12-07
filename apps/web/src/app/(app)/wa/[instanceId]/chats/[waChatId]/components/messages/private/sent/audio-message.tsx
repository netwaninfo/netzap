import { PrivateAudioMessage } from '@netzap/entities/chat'
import { HeadphoneOff } from 'lucide-react'

import {
  MessageBody,
  MessageBodySpacer,
  MessageContent,
  MessageFooter,
  MessageGroup,
} from '@/pages/chat/components/ui/message'
import {
  MessageSent,
  MessageSentDate,
  MessageSentMediaBox,
} from '@/pages/chat/components/ui/message-sent'
import { useMessage } from '@/pages/chat/hooks/use-message'
import { MessageStatus } from '@/pages/chats/components/messages/message-status'

interface SentPrivateAudioMessageProps {
  message: PrivateAudioMessage
}

export function SentPrivateAudioMessage({
  message,
}: SentPrivateAudioMessageProps) {
  const { formattedDate } = useMessage({ message })

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
            <MessageSentDate dateTime={formattedDate.datetime}>
              {formattedDate.display}
            </MessageSentDate>

            <MessageStatus status={message.status} />
          </MessageFooter>
        </MessageContent>
      </MessageSentMediaBox>
    </MessageSent>
  )
}
