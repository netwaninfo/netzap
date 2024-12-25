import type { GroupImageMessage } from '@netzap/entities/chat'
import { ImageOff } from 'lucide-react'
import Link from 'next/link'

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

interface ReceivedGroupImageMessageProps {
  message: GroupImageMessage
}

export function ReceivedGroupImageMessage({
  message,
}: ReceivedGroupImageMessageProps) {
  const { calendarDate, author } = useGroupMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedMediaBox>
        <MessageContent>
          <MessageHeader>
            <MessageAuthor>{author}</MessageAuthor>
          </MessageHeader>

          {message.media ? (
            <MessageGroup className="flex-col items-start space-x-0 space-y-1">
              <Link
                href={message.media.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm overflow-hidden"
              >
                <img
                  alt=""
                  src={message.media.url}
                  className="aspect-auto w-full h-full"
                />
              </Link>

              {message.body && (
                <MessageBody>
                  {message.body}

                  <MessageBodySpacer />
                </MessageBody>
              )}
            </MessageGroup>
          ) : (
            <MessageGroup>
              <ImageOff className="size-4" />

              <MessageBody>
                Imagem não disponível
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
