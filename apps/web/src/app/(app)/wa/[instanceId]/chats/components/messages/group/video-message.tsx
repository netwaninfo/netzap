import { GroupVideoMessage } from '@netzap/entities/chat'

import { getMessageAuthorName } from '@/utils/get-message-author-name'
import { Video } from 'lucide-react'
import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
  MessageContentGroup,
  MessageIcon,
} from '../../ui/message'
import { MessageStatus } from '../message-status'

interface GroupChatLastVideoMessageProps {
  message: GroupVideoMessage
}

export function GroupChatLastVideoMessage({
  message,
}: GroupChatLastVideoMessageProps) {
  const author = getMessageAuthorName(message.author)

  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageAuthor>{author}</MessageAuthor>

        <MessageContentGroup>
          <MessageIcon>
            <Video className="size-4" />
          </MessageIcon>

          <MessageBody>{message.body ? message.body : 'Video'}</MessageBody>
        </MessageContentGroup>
      </MessageContent>
    </Message>
  )
}
