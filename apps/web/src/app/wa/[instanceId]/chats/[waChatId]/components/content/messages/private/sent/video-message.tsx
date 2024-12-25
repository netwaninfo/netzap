import type { PrivateVideoMessage } from '@netzap/entities/chat'
import { Play, VideoOff } from 'lucide-react'
import Link from 'next/link'

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

interface SentPrivateVideoMessageProps {
  message: PrivateVideoMessage
}

export function SentPrivateVideoMessage({
  message,
}: SentPrivateVideoMessageProps) {
  const { calendarDate } = usePrivateMessage({ message })

  return (
    <MessageSent>
      <MessageSentMediaBox>
        <MessageContent>
          {message.media ? (
            <MessageGroup className="flex-col space-x-0 space-y-1">
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
