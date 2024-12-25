import type { GroupMessage } from '@netzap/entities/chat'

import { SentGroupAudioMessage } from './audio-message'
import { SentGroupDocumentMessage } from './document-message'
import { SentGroupImageMessage } from './image-message'
import { SentGroupMultiVCardMessage } from './multi-v-card-message'
import { SentGroupRevokedMessage } from './revoked-message'
import { SentGroupTextMessage } from './text-message'
import { SentGroupUnknownMessage } from './unknown-message'
import { SentGroupVCardMessage } from './v-card-message'
import { SentGroupVideoMessage } from './video-message'
import { SentGroupVoiceMessage } from './voice-message'

interface SentGroupMessageProps {
  message: GroupMessage
}

export function SentGroupMessage({ message }: SentGroupMessageProps) {
  switch (message.type) {
    case 'text':
      return <SentGroupTextMessage message={message} />

    case 'audio':
      return <SentGroupAudioMessage message={message} />

    case 'voice':
      return <SentGroupVoiceMessage message={message} />

    case 'image':
      return <SentGroupImageMessage message={message} />

    case 'video':
      return <SentGroupVideoMessage message={message} />

    case 'document':
      return <SentGroupDocumentMessage message={message} />

    case 'vcard':
      return <SentGroupVCardMessage message={message} />

    case 'multi_vcard':
      return <SentGroupMultiVCardMessage message={message} />

    case 'revoked':
      return <SentGroupRevokedMessage message={message} />

    default:
      return <SentGroupUnknownMessage message={message} />
  }
}
