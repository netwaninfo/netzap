import { GroupVoiceMessage } from '@netzap/entities/chat'
import { MicOff } from 'lucide-react'

import {
  MessageAuthor,
  MessageBody,
  MessageBodySpacer,
  MessageContent,
  MessageFooter,
  MessageHeader,
  MessageRow,
} from '@/pages/chat/components/ui/message'
import {
  MessageReceived,
  MessageReceivedBox,
  MessageReceivedDate,
} from '@/pages/chat/components/ui/message-received'

import { useGroupMessage } from '@/pages/chat/hooks/use-group-message'

interface ReceivedGroupVoiceMessageProps {
  message: GroupVoiceMessage
}

export function ReceivedGroupVoiceMessage({
  message,
}: ReceivedGroupVoiceMessageProps) {
  const { formattedDate, author } = useGroupMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedBox>
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
            <MessageRow>
              <MicOff className="size-4" />

              <MessageBody>
                Audio não disponível
                <MessageBodySpacer />
              </MessageBody>
            </MessageRow>
          )}

          <MessageFooter>
            <MessageReceivedDate dateTime={formattedDate.datetime}>
              {formattedDate.display}
            </MessageReceivedDate>
          </MessageFooter>
        </MessageContent>
      </MessageReceivedBox>
    </MessageReceived>
  )
}
