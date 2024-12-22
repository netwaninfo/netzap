import type { GroupMultiVCardMessage } from '@netzap/entities/chat'

import { getMessageAuthorName } from '@/utils/get-message-author-name'
import { getMessageContactNames } from '@/utils/get-message-contact-names'
import { UsersRound } from 'lucide-react'
import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
  MessageContentGroup,
  MessageIcon,
} from '../../ui/message'
import { MessageStatus } from '../message-status'

interface GroupChatLastMultiVCardMessageProps {
  message: GroupMultiVCardMessage
}

export function GroupChatLastMultiVCardMessage({
  message,
}: GroupChatLastMultiVCardMessageProps) {
  const author = getMessageAuthorName(message.author)
  const names = getMessageContactNames(message.contacts)

  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageAuthor>{author}:</MessageAuthor>

        <MessageContentGroup>
          <MessageIcon>
            <UsersRound className="size-4" />
          </MessageIcon>

          <MessageBody>{names}</MessageBody>
        </MessageContentGroup>
      </MessageContent>
    </Message>
  )
}
