import { UsersRound } from 'lucide-react'

import type { PrivateMultiVCardMessage } from '@netzap/entities/chat'

import {
  Message,
  MessageBody,
  MessageContent,
  MessageIcon,
} from '@/pages/instanceId/chats/components/message'
import { MessageStatus } from '@/pages/instanceId/chats/components/message-status'

import { useNameOfContacts } from '@/hooks/use-name-of-contacts'

interface PrivateChatLastMultiVCardMessageProps {
  message: PrivateMultiVCardMessage
}

export function PrivateChatLastMultiVCardMessage({
  message,
}: PrivateChatLastMultiVCardMessageProps) {
  const contactNames = useNameOfContacts(message.contacts)

  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageIcon>
          <UsersRound className="size-4" />
        </MessageIcon>

        <MessageBody>{contactNames}</MessageBody>
      </MessageContent>
    </Message>
  )
}
