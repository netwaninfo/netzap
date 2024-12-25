import type { PrivateVideoMessage } from '@netzap/entities/chat'
import { Play, VideoOff } from 'lucide-react'
import Link from 'next/link'

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
import { useMessageItem } from '../../use-message-item'

interface ReceivedPrivateVideoMessageProps {
  message: PrivateVideoMessage
}

export function ReceivedPrivateVideoMessage({
  message,
}: ReceivedPrivateVideoMessageProps) {
  const { calendarDate } = useMessageItem({ message })

  return (
    <MessageReceived>
      <MessageReceivedMediaBox>
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
            <MessageReceivedDate dateTime={calendarDate.datetime}>
              {calendarDate.text}
            </MessageReceivedDate>
          </MessageFooter>
        </MessageContent>
      </MessageReceivedMediaBox>
    </MessageReceived>
  )
}
