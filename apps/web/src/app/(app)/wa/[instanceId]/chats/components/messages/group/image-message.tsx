import { GroupImageMessage } from '@netzap/entities/chat'

import { getMessageAuthorName } from '@/utils/get-message-author-name'
import { Image } from 'lucide-react'
import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
  MessageContentGroup,
  MessageIcon,
} from '../../ui/message'
import { MessageStatus } from '../message-status'

interface GroupChatLastImageMessageProps {
  message: GroupImageMessage
}

export function GroupChatLastImageMessage({
  message,
}: GroupChatLastImageMessageProps) {
  const author = getMessageAuthorName(message.author)

  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageAuthor>{author}:</MessageAuthor>

        <MessageContentGroup>
          <MessageIcon>
            <Image className="size-4" />
          </MessageIcon>

          <MessageBody>{message.body ? message.body : 'Imagem'}</MessageBody>
        </MessageContentGroup>
      </MessageContent>
    </Message>
  )
}
