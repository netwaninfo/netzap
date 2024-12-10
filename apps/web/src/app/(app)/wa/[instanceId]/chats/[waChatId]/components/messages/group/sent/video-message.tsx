import { GroupVideoMessage } from '@netzap/entities/chat'
import { Play, VideoOff } from 'lucide-react'

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

import { useGroupMessage } from '@/pages/chat/hooks/use-group-message'
import Link from 'next/link'
import { MessageStatus } from '../../../../../components/messages/message-status'

interface SentGroupVideoMessageProps {
  message: GroupVideoMessage
}

export function SentGroupVideoMessage({ message }: SentGroupVideoMessageProps) {
  const { formattedDate } = useGroupMessage({ message })

  return (
    <MessageSent>
      <MessageSentMediaBox>
        <MessageContent>
          {message.media ? (
            <MessageGroup className="flex-col items-start space-x-0 space-y-1">
              <div className="relative">
                <div className="absolute inset-x-center inset-y-center">
                  <Play className="size-4" />
                </div>

                <Link
                  href={message.media.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-sm overflow-hidden"
                >
                  <video className="aspect-auto w-full h-full">
                    <source
                      src={message.media.url}
                      type={message.media.mimeType}
                    />
                    <track kind="captions" />
                  </video>
                </Link>
              </div>

              {message.body && (
                <MessageBody>
                  {message.body}

                  <MessageBodySpacer />
                </MessageBody>
              )}
            </MessageGroup>
          ) : (
            <MessageGroup>
              <VideoOff className="size-4" />

              <MessageBody>
                Vídeo não disponível
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
