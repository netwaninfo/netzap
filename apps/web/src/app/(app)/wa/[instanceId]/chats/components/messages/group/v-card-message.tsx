import { GroupVCardMessage } from '@netzap/entities/chat'
import { UserRound } from 'lucide-react'

import { getMessageAuthorName } from '@/utils/get-message-author-name'
import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
  MessageContentGroup,
  MessageIcon,
} from '../../ui/message'
import { MessageStatus } from '../message-status'

interface GroupChatLastVCardMessageProps {
  message: GroupVCardMessage
}

export function GroupChatLastVCardMessage({
  message,
}: GroupChatLastVCardMessageProps) {
  const author = getMessageAuthorName(message.author)

  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageAuthor>{author}:</MessageAuthor>

        <MessageContentGroup>
          <MessageIcon>
            <UserRound className="size-4" />
          </MessageIcon>

          <MessageBody>{message.contact.name}</MessageBody>
        </MessageContentGroup>
      </MessageContent>
    </Message>
  )
}
