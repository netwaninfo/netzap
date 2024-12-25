import type { GroupDocumentMessage } from '@netzap/entities/chat'
import { File, FileX2 } from 'lucide-react'
import Link from 'next/link'

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
import { MessageStatus } from '@/pages/instanceId/chats/components/message-status'
import { useGroupMessage } from '../use-group-message'

interface SentGroupDocumentMessageProps {
  message: GroupDocumentMessage
}

export function SentGroupDocumentMessage({
  message,
}: SentGroupDocumentMessageProps) {
  const { calendarDate } = useGroupMessage({ message })

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
