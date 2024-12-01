import { GroupRevokedMessage } from '@netzap/entities/chat'

import { getMessageAuthorName } from '@/utils/get-message-author-name'
import { Ban } from 'lucide-react'
import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
  MessageContentGroup,
  MessageIcon,
} from '../../ui/message'

interface GroupChatLastRevokedMessageProps {
  message: GroupRevokedMessage
}

export function GroupChatLastRevokedMessage({
  message,
}: GroupChatLastRevokedMessageProps) {
  const author = getMessageAuthorName(message.author)

  return (
    <Message>
      <MessageContent>
        <MessageAuthor>{author}</MessageAuthor>

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
