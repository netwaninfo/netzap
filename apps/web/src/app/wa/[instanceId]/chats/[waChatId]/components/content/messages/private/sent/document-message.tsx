import type { PrivateDocumentMessage } from '@netzap/entities/chat'
import { File, FileX2 } from 'lucide-react'
import Link from 'next/link'

import { MessageStatus } from '@/app/wa/[instanceId]/chats/components/message-status'
import {
  MessageBody,
  MessageBodySpacer,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageShape,
} from '@/pages/instanceId/chats/[waChatId]/components/message'
import {
  MessageSent,
  MessageSentDate,
  MessageSentMediaBox,
} from '@/pages/instanceId/chats/[waChatId]/components/message-sent'
import { usePrivateMessage } from '../use-private-message'

interface SentPrivateDocumentMessageProps {
  message: PrivateDocumentMessage
}

export function SentPrivateDocumentMessage({
  message,
}: SentPrivateDocumentMessageProps) {
  const { calendarDate } = usePrivateMessage({ message })

  return (
    <MessageSent>
      <MessageSentMediaBox>
        <MessageContent>
          {message.media ? (
            <Link
              href={message.media.url}
              target="_blank"
              rel="noreferrer"
              className="!mb-4 block"
            >
              <MessageShape>
                <File className="size-6" />

                <MessageBody>{message.body}</MessageBody>
              </MessageShape>
            </Link>
          ) : (
            <MessageGroup>
              <FileX2 className="size-4" />

              <MessageBody>
                Mídia não disponível
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
