import type { GroupImageMessage } from '@netzap/entities/chat'
import { ImageOff } from 'lucide-react'
import Link from 'next/link'

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
import { MessageStatus } from '@/pages/instanceId/chats/components/message-status'
import { useGroupMessage } from '../use-group-message'

interface SentGroupImageMessageProps {
  message: GroupImageMessage
}

export function SentGroupImageMessage({ message }: SentGroupImageMessageProps) {
  const { calendarDate } = useGroupMessage({ message })

  return (
    <MessageSent>
      <MessageSentMediaBox>
        <MessageContent>
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
