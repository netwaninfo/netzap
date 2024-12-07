import { PrivateRevokedMessage } from '@netzap/entities/chat'
import { Ban } from 'lucide-react'

import {
  MessageBody,
  MessageBodySpacer,
  MessageContent,
  MessageFooter,
  MessageGroup,
} from '@/pages/chat/components/ui/message'
import {
  MessageReceived,
  MessageReceivedBox,
  MessageReceivedDate,
} from '@/pages/chat/components/ui/message-received'

import { useMessage } from '@/pages/chat/hooks/use-message'

interface ReceivedPrivateRevokedMessageProps {
  message: PrivateRevokedMessage
}

export function ReceivedPrivateRevokedMessage({
  message,
}: ReceivedPrivateRevokedMessageProps) {
  const { formattedDate } = useMessage({ message })

  return (
    <MessageReceived>
      <MessageReceivedBox>
        <MessageContent>
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
