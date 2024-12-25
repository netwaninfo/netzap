import type { GroupMultiVCardMessage } from '@netzap/entities/chat'
import { UsersRound } from 'lucide-react'

import { useNameOfAuthor } from '@/hooks/use-name-of-author'
import { useNameOfContacts } from '@/hooks/use-name-of-contacts'

import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
  MessageContentGroup,
  MessageIcon,
} from '@/pages/instanceId/chats/components/message'
import { MessageStatus } from '@/pages/instanceId/chats/components/message-status'

interface GroupChatLastMultiVCardMessageProps {
  message: GroupMultiVCardMessage
}

export function GroupChatLastMultiVCardMessage({
  message,
}: GroupChatLastMultiVCardMessageProps) {
  const author = useNameOfAuthor(message.author)
  const contactNames = useNameOfContacts(message.contacts)

  return (
    <Message>
      {message.isFromMe && <MessageStatus status={message.status} />}

      <MessageContent>
        <MessageAuthor>{author}:</MessageAuthor>

        <MessageContentGroup>
          <MessageIcon>
            <UsersRound className="size-4" />
          </MessageIcon>

          <MessageBody>{contactNames}</MessageBody>
        </MessageContentGroup>
      </MessageContent>
    </Message>
  )
}
