import type { GroupRevokedMessage } from '@netzap/entities/chat'
import { Ban } from 'lucide-react'

import { useNameOfAuthor } from '@/hooks/use-name-of-author'

import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
  MessageContentGroup,
  MessageIcon,
} from '@/pages/instanceId/chats/components/message'

interface GroupChatLastRevokedMessageProps {
  message: GroupRevokedMessage
}

export function GroupChatLastRevokedMessage({
  message,
}: GroupChatLastRevokedMessageProps) {
  const author = useNameOfAuthor(message.author)

  return (
    <Message>
      <MessageContent>
        <MessageAuthor>{author}:</MessageAuthor>

        <MessageContentGroup>
          <MessageIcon>
            <Ban className="size-4" />
          </MessageIcon>

          <MessageBody>Mensagem apagada</MessageBody>
        </MessageContentGroup>
      </MessageContent>
    </Message>
  )
}
