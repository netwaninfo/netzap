import type { PrivateMessage } from '@netzap/entities/chat'

import { ReceivedPrivateAudioMessage } from './audio-message'
import { ReceivedPrivateDocumentMessage } from './document-message'
import { ReceivedPrivateImageMessage } from './image-message'
import { ReceivedPrivateMultiVCardMessage } from './multi-v-card-message'
import { ReceivedPrivateRevokedMessage } from './revoked-message'
import { ReceivedPrivateTextMessage } from './text-message'
import { ReceivedPrivateUnknownMessage } from './unknown-message'
import { ReceivedPrivateVCardMessage } from './v-card-message'
import { ReceivedPrivateVideoMessage } from './video-message'
import { ReceivedPrivateVoiceMessage } from './voice-message'

interface ReceivedPrivateMessageProps {
  message: PrivateMessage
}

export function ReceivedPrivateMessage({
  message,
}: ReceivedPrivateMessageProps) {
  switch (message.type) {
    case 'text':
      return <ReceivedPrivateTextMessage message={message} />

    case 'audio':
      return <ReceivedPrivateAudioMessage message={message} />

    case 'voice':
      return <ReceivedPrivateVoiceMessage message={message} />

    case 'image':
      return <ReceivedPrivateImageMessage message={message} />

    case 'video':
      return <ReceivedPrivateVideoMessage message={message} />

    case 'document':
      return <ReceivedPrivateDocumentMessage message={message} />

    case 'vcard':
      return <ReceivedPrivateVCardMessage message={message} />

    case 'multi_vcard':
      return <ReceivedPrivateMultiVCardMessage message={message} />

    case 'revoked':
      return <ReceivedPrivateRevokedMessage message={message} />

    default:
      return <ReceivedPrivateUnknownMessage message={message} />
  }
}
