import type { GroupTextMessage } from '@netzap/entities/chat'

import { getMessageAuthorName } from '@/utils/get-message-author-name'
import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
} from '../../ui/message'
import { MessageStatus } from '../message-status'

interface GroupChatLastTextMessageProps {
  message: GroupTextMessage
}

export function GroupChatLastTextMessage({
  message,
}: GroupChatLastTextMessageProps) {
  const author = getMessageAuthorName(message.author)

  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageAuthor>{author}:</MessageAuthor>

        <MessageBody>{message.body}</MessageBody>
      </MessageContent>
    </Message>
  )
}
