import type { GroupTextMessage } from '@netzap/entities/chat'

import { useNameOfAuthor } from '@/hooks/use-name-of-author'

import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
} from '@/pages/instanceId/chats/components/message'
import { MessageStatus } from '@/pages/instanceId/chats/components/message-status'

interface GroupChatLastTextMessageProps {
  message: GroupTextMessage
}

export function GroupChatLastTextMessage({
  message,
}: GroupChatLastTextMessageProps) {
  const author = useNameOfAuthor(message.author)

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
