import { PrivateMessage } from '@netzap/entities/chat'

import { PrivateChatLastAudioMessage } from './audio-message'
import { PrivateChatLastDocumentMessage } from './document-message'
import { PrivateChatLastImageMessage } from './image-message'
import { PrivateChatLastMultiVCardMessage } from './multi-v-card-message'
import { PrivateChatLastRevokedMessage } from './revoked-message'
import { PrivateChatLastTextMessage } from './text-message'
import { PrivateChatLastUnknownMessage } from './unknown-message'
import { PrivateChatLastVCardMessage } from './v-card-message'
import { PrivateChatLastVideoMessage } from './video-message'
import { PrivateChatLastVoiceMessage } from './voice-message'

interface PrivateChatLastMessageProps {
  message: PrivateMessage
}

export function PrivateChatLastMessage({
  message,
}: PrivateChatLastMessageProps) {
  switch (message.type) {
    case 'text':
      return <PrivateChatLastTextMessage message={message} />

    case 'image':
      return <PrivateChatLastImageMessage message={message} />

    case 'video':
      return <PrivateChatLastVideoMessage message={message} />

    case 'audio':
      return <PrivateChatLastAudioMessage message={message} />

    case 'voice':
      return <PrivateChatLastVoiceMessage message={message} />

    case 'document':
      return <PrivateChatLastDocumentMessage message={message} />

    case 'multi_vcard':
      return <PrivateChatLastMultiVCardMessage message={message} />

    case 'vcard':
      return <PrivateChatLastVCardMessage message={message} />

    case 'revoked':
      return <PrivateChatLastRevokedMessage message={message} />

    default:
      return <PrivateChatLastUnknownMessage message={message} />
  }
}
