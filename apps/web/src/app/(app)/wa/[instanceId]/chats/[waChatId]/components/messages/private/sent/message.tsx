import type { PrivateMessage } from '@netzap/entities/chat'
import { SentPrivateAudioMessage } from './audio-message'
import { SentPrivateDocumentMessage } from './document-message'
import { SentPrivateImageMessage } from './image-message'
import { SentPrivateMultiVCardMessage } from './multi-v-card-message'
import { SentPrivateRevokedMessage } from './revoked-message'
import { SentPrivateTextMessage } from './text-message'
import { SentPrivateUnknownMessage } from './unknown-message'
import { SentPrivateVCardMessage } from './v-card-message'
import { SentPrivateVideoMessage } from './video-message'
import { SentPrivateVoiceMessage } from './voice-message'

interface SentPrivateMessageProps {
  message: PrivateMessage
}

export function SentPrivateMessage({ message }: SentPrivateMessageProps) {
  switch (message.type) {
    case 'text':
      return <SentPrivateTextMessage message={message} />

    case 'audio':
      return <SentPrivateAudioMessage message={message} />

    case 'voice':
      return <SentPrivateVoiceMessage message={message} />

    case 'image':
      return <SentPrivateImageMessage message={message} />

    case 'video':
      return <SentPrivateVideoMessage message={message} />

    case 'document':
      return <SentPrivateDocumentMessage message={message} />

    case 'vcard':
      return <SentPrivateVCardMessage message={message} />

    case 'multi_vcard':
      return <SentPrivateMultiVCardMessage message={message} />

    case 'revoked':
      return <SentPrivateRevokedMessage message={message} />

    default:
      return <SentPrivateUnknownMessage message={message} />
  }
}
