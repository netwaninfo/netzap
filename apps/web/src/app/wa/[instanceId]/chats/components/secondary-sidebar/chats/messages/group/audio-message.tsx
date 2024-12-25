import type { GroupAudioMessage } from '@netzap/entities/chat'
import { Headphones } from 'lucide-react'

import { useNameOfAuthor } from '@/hooks/use-name-of-author'
import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
  MessageContentGroup,
  MessageIcon,
} from '@/pages/instanceId/chats/components/message'
import { MessageStatus } from '@/pages/instanceId/chats/components/message-status'

interface GroupChatLastAudioMessageProps {
  message: GroupAudioMessage
}

export function GroupChatLastAudioMessage({
  message,
}: GroupChatLastAudioMessageProps) {
  const author = useNameOfAuthor(message.author)

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
