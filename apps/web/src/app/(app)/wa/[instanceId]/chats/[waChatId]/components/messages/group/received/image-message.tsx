import { GroupImageMessage } from '@netzap/entities/chat'
import { ImageOff } from 'lucide-react'

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

interface ReceivedGroupImageMessageProps {
  message: GroupImageMessage
}

export function ReceivedGroupImageMessage({
  message,
}: ReceivedGroupImageMessageProps) {
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
            </MessageRow>
          ) : (
            <MessageRow>
              <ImageOff className="size-4" />

              <MessageBody>
                Imagem não disponível
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
