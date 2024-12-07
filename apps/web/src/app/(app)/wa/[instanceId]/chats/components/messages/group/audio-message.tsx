import { GroupAudioMessage } from '@netzap/entities/chat'

import { getMessageAuthorName } from '@/utils/get-message-author-name'
import { Headphones } from 'lucide-react'
import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
  MessageContentGroup,
  MessageIcon,
} from '../../ui/message'
import { MessageStatus } from '../message-status'

interface GroupChatLastAudioMessageProps {
  message: GroupAudioMessage
}

export function GroupChatLastAudioMessage({
  message,
}: GroupChatLastAudioMessageProps) {
  const author = getMessageAuthorName(message.author)

  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageAuthor>{author}:</MessageAuthor>

        <MessageContentGroup>
          <MessageIcon>
            <Headphones className="size-4" />
          </MessageIcon>

          <MessageBody>Audio</MessageBody>
        </MessageContentGroup>
      </MessageContent>
    </Message>
  )
}
