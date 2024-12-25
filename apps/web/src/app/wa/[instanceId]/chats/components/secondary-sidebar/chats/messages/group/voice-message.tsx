import type { GroupVoiceMessage } from '@netzap/entities/chat'
import { Mic } from 'lucide-react'

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

interface GroupChatLastVoiceMessageProps {
  message: GroupVoiceMessage
}

export function GroupChatLastVoiceMessage({
  message,
}: GroupChatLastVoiceMessageProps) {
  const author = useNameOfAuthor(message.author)

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
