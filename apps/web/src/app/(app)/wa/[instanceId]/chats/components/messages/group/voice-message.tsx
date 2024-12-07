import { GroupVoiceMessage } from '@netzap/entities/chat'

import { getMessageAuthorName } from '@/utils/get-message-author-name'
import { Mic } from 'lucide-react'
import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
  MessageContentGroup,
  MessageIcon,
} from '../../ui/message'
import { MessageStatus } from '../message-status'

interface GroupChatLastVoiceMessageProps {
  message: GroupVoiceMessage
}

export function GroupChatLastVoiceMessage({
  message,
}: GroupChatLastVoiceMessageProps) {
  const author = getMessageAuthorName(message.author)

  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageAuthor>{author}:</MessageAuthor>

        <MessageContentGroup>
          <MessageIcon>
            <Mic className="size-4" />
          </MessageIcon>

          <MessageBody>Audio</MessageBody>
        </MessageContentGroup>
      </MessageContent>
    </Message>
  )
}
