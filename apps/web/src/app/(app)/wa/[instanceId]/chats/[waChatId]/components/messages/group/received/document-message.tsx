import { GroupDocumentMessage } from '@netzap/entities/chat'
import { File, FileX2 } from 'lucide-react'

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

interface ReceivedGroupDocumentMessageProps {
  message: GroupDocumentMessage
}

export function ReceivedGroupDocumentMessage({
  message,
}: ReceivedGroupDocumentMessageProps) {
  const { formattedDate, author } = useGroupMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedBox className="max-w-84 w-full">
        <MessageContent>
          <MessageHeader>
            <MessageAuthor>{author}</MessageAuthor>
          </MessageHeader>

          {message.media ? (
            <Link
              href={message.media.url}
              target="_blank"
              rel="noreferrer"
              className="!mb-4 block"
            >
              <MessageRow className="bg-primary/5 p-2 rounded-sm">
                <File className="size-6" />

                <MessageBody>{message.body}</MessageBody>
              </MessageRow>
            </Link>
          ) : (
            <MessageRow>
              <FileX2 className="size-4" />

              <MessageBody>
                Mídia não disponível
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
