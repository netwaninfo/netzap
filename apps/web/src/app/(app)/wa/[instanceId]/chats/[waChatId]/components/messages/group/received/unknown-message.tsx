import { GroupUnknownMessage } from '@netzap/entities/chat'
import { CircleHelp } from 'lucide-react'

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

interface ReceivedGroupUnknownMessageProps {
  message: GroupUnknownMessage
}

export function ReceivedGroupUnknownMessage({
  message,
}: ReceivedGroupUnknownMessageProps) {
  const { formattedDate, author } = useGroupMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedBox>
        <MessageContent>
          <MessageHeader>
            <MessageAuthor>{author}</MessageAuthor>
          </MessageHeader>

          <MessageRow>
            <CircleHelp className="size-4" />

            <MessageBody>
              Mensagem não disponível <MessageBodySpacer />
            </MessageBody>
          </MessageRow>

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
