import type { GroupMessage } from '@netzap/entities/chat'

import { GroupChatLastAudioMessage } from './audio-message'
import { GroupChatLastDocumentMessage } from './document-message'
import { GroupChatLastImageMessage } from './image-message'
import { GroupChatLastMultiVCardMessage } from './multi-v-card-message'
import { GroupChatLastRevokedMessage } from './revoked-message'
import { GroupChatLastTextMessage } from './text-message'
import { GroupChatLastUnknownMessage } from './unknown-message'
import { GroupChatLastVCardMessage } from './v-card-message'
import { GroupChatLastVideoMessage } from './video-message'
import { GroupChatLastVoiceMessage } from './voice-message'

interface GroupChatLastMessageProps {
  message: GroupMessage
}

export function GroupChatLastMessage({ message }: GroupChatLastMessageProps) {
  switch (message.type) {
    case 'text':
      return <GroupChatLastTextMessage message={message} />

    case 'image':
      return <GroupChatLastImageMessage message={message} />

    case 'video':
      return <GroupChatLastVideoMessage message={message} />

    case 'audio':
      return <GroupChatLastAudioMessage message={message} />

    case 'voice':
      return <GroupChatLastVoiceMessage message={message} />

    case 'document':
      return <GroupChatLastDocumentMessage message={message} />

    case 'multi_vcard':
      return <GroupChatLastMultiVCardMessage message={message} />

    case 'vcard':
      return <GroupChatLastVCardMessage message={message} />

    case 'revoked':
      return <GroupChatLastRevokedMessage message={message} />

    default:
      return <GroupChatLastUnknownMessage message={message} />
  }
}
