import { GroupMessage as GroupMessageEntity } from '@netzap/entities/chat'
import { MessageBody } from '../../ui/message'
import {
  MessageSent,
  MessageSentContent,
  MessageSentDate,
} from '../../ui/message-sent'

interface GroupMessageProps {
  message: GroupMessageEntity
}

export function GroupMessage({ message }: GroupMessageProps) {
  return (
    <MessageSent>
      <MessageSentContent>
        <MessageBody>Not bad, just working on a new project. You?</MessageBody>

        <MessageSentDate>{message.createdAt.toISOString()}</MessageSentDate>
      </MessageSentContent>
    </MessageSent>
  )
}
