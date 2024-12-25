import type { PrivateDocumentMessage } from '@netzap/entities/chat'
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
  MessageReceived,
  MessageReceivedDate,
  MessageReceivedMediaBox,
} from '@/pages/instanceId/chats/[waChatId]/components/message-received'
import { usePrivateMessage } from '../use-private-message'

interface ReceivedPrivateDocumentMessageProps {
  message: PrivateDocumentMessage
}

export function ReceivedPrivateDocumentMessage({
  message,
}: ReceivedPrivateDocumentMessageProps) {
  const { calendarDate } = usePrivateMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedMediaBox>
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
            <MessageReceivedDate dateTime={calendarDate.datetime}>
              {calendarDate.text}
            </MessageReceivedDate>
          </MessageFooter>
        </MessageContent>
      </MessageReceivedMediaBox>
    </MessageReceived>
  )
}
