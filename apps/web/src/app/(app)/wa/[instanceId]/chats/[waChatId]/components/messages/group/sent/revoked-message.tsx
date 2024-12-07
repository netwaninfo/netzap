import { GroupRevokedMessage } from '@netzap/entities/chat'
import { Ban } from 'lucide-react'

import {
  MessageBody,
  MessageBodySpacer,
  MessageContent,
  MessageFooter,
  MessageGroup,
} from '@/pages/chat/components/ui/message'
import {
  MessageSent,
  MessageSentBox,
  MessageSentDate,
} from '@/pages/chat/components/ui/message-sent'

import { useGroupMessage } from '@/pages/chat/hooks/use-group-message'

interface SentGroupRevokedMessageProps {
  message: GroupRevokedMessage
}

export function SentGroupRevokedMessage({
  message,
}: SentGroupRevokedMessageProps) {
  const { formattedDate } = useGroupMessage({ message })

  return (
    <MessageSent>
      <MessageSentBox>
        <MessageContent>
          <MessageGroup>
            <Ban className="size-4" />

            <MessageBody>
              Mensagem apagada
              <MessageBodySpacer />
            </MessageBody>
          </MessageGroup>

          <MessageFooter>
            <MessageSentDate dateTime={formattedDate.datetime}>
              {formattedDate.display}
            </MessageSentDate>
          </MessageFooter>
        </MessageContent>
      </MessageSentBox>
    </MessageSent>
  )
}
