import { GroupRevokedMessage } from '@netzap/entities/chat'
import { Ban } from 'lucide-react'

import {
  MessageAuthor,
  MessageBody,
  MessageBodySpacer,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from '@/pages/chat/components/ui/message'
import {
  MessageReceived,
  MessageReceivedBox,
  MessageReceivedDate,
} from '@/pages/chat/components/ui/message-received'

import { useGroupMessage } from '@/pages/chat/hooks/use-group-message'

interface ReceivedGroupRevokedMessageProps {
  message: GroupRevokedMessage
}

export function ReceivedGroupRevokedMessage({
  message,
}: ReceivedGroupRevokedMessageProps) {
  const { formattedDate, author } = useGroupMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedBox>
        <MessageContent>
          <MessageHeader>
            <MessageAuthor>{author}</MessageAuthor>
          </MessageHeader>

          <MessageGroup>
            <Ban className="size-4" />

            <MessageBody>
              Mensagem apagada
              <MessageBodySpacer />
            </MessageBody>
          </MessageGroup>

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
