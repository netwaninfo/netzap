import { PrivateMultiVCardMessage } from '@netzap/entities/chat'

import { getMessageContactNames } from '@/utils/get-message-contact-names'
import { UsersRound } from 'lucide-react'
import {
  Message,
  MessageBody,
  MessageContent,
  MessageIcon,
} from '../../ui/message'
import { MessageStatus } from '../message-status'

interface PrivateChatLastMultiVCardMessageProps {
  message: PrivateMultiVCardMessage
}

export function PrivateChatLastMultiVCardMessage({
  message,
}: PrivateChatLastMultiVCardMessageProps) {
  const names = getMessageContactNames(message.contacts)

  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageIcon>
          <UsersRound className="size-4" />
        </MessageIcon>

        <MessageBody>{names}</MessageBody>
      </MessageContent>
    </Message>
  )
}
