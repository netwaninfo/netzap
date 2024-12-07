import { GroupDocumentMessage } from '@netzap/entities/chat'
import { File, FileX2 } from 'lucide-react'

import {
  MessageBody,
  MessageBodySpacer,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageShape,
} from '@/pages/chat/components/ui/message'
import {
  MessageSent,
  MessageSentDate,
  MessageSentMediaBox,
} from '@/pages/chat/components/ui/message-sent'

import { useGroupMessage } from '@/pages/chat/hooks/use-group-message'
import Link from 'next/link'
import { MessageStatus } from '../../../../../components/messages/message-status'

interface SentGroupDocumentMessageProps {
  message: GroupDocumentMessage
}

export function SentGroupDocumentMessage({
  message,
}: SentGroupDocumentMessageProps) {
  const { formattedDate } = useGroupMessage({ message })

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
