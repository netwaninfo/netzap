import { PrivateImageMessage } from '@netzap/entities/chat'
import { ImageOff } from 'lucide-react'

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
import Link from 'next/link'

interface SentPrivateImageMessageProps {
  message: PrivateImageMessage
}

export function SentPrivateImageMessage({
  message,
}: SentPrivateImageMessageProps) {
  const { formattedDate } = useMessage({ message })

  return (
    <MessageSent>
      <MessageSentMediaBox>
        <MessageContent>
          {message.media ? (
            <MessageGroup className="flex-col space-x-0 space-y-1">
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
