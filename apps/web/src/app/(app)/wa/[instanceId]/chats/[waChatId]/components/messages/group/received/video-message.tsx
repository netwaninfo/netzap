import { GroupVideoMessage } from '@netzap/entities/chat'
import { Play, VideoOff } from 'lucide-react'

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
import Link from 'next/link'

interface ReceivedGroupVideoMessageProps {
  message: GroupVideoMessage
}

export function ReceivedGroupVideoMessage({
  message,
}: ReceivedGroupVideoMessageProps) {
  const { formattedDate, author } = useGroupMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedBox className="max-w-84">
        <MessageContent>
          <MessageHeader>
            <MessageAuthor>{author}</MessageAuthor>
          </MessageHeader>

          {message.media ? (
            <MessageRow className="flex-col space-x-0 space-y-1">
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
            </MessageRow>
          ) : (
            <MessageRow>
              <VideoOff className="size-4" />

              <MessageBody>
                Vídeo não disponível
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
