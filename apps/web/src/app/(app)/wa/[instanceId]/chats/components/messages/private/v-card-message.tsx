import { PrivateVCardMessage } from '@netzap/entities/chat'
import { UserRound } from 'lucide-react'

import {
  Message,
  MessageBody,
  MessageContent,
  MessageIcon,
} from '../../ui/message'
import { MessageStatus } from '../message-status'

interface PrivateChatLastVCardMessageProps {
  message: PrivateVCardMessage
}

export function PrivateChatLastVCardMessage({
  message,
}: PrivateChatLastVCardMessageProps) {
  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageIcon>
          <UserRound className="size-4" />
        </MessageIcon>

        <MessageBody>{message.contact.name}</MessageBody>
      </MessageContent>
    </Message>
  )
}
