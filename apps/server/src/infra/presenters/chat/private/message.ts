import type { PrivateMessage as Output } from '@netzap/entities/chat'

import type { PrivateMessage } from '@/domain/chat/enterprise/types/message.js'
import { PrivateAudioMessagePresenter } from './audio-message.js'
import { PrivateDocumentMessagePresenter } from './document-message.js'
import { PrivateImageMessagePresenter } from './image-message.js'
import { PrivateMultiVCardMessagePresenter } from './multi-v-card-message.js'
import { PrivateRevokedMessagePresenter } from './revoked-message.js'
import { PrivateTextMessagePresenter } from './text-message.js'
import { PrivateUnknownMessagePresenter } from './unknown-message.js'
import { PrivateVCardMessagePresenter } from './v-card-message.js'
import { PrivateVideoMessagePresenter } from './video-message.js'
import { PrivateVoiceMessagePresenter } from './voice-message.js'

export class PrivateMessagePresenter {
  static toOutput(message: PrivateMessage): Output {
    switch (message.type) {
      case 'audio':
        return PrivateAudioMessagePresenter.toOutput(message)

      case 'document':
        return PrivateDocumentMessagePresenter.toOutput(message)

      case 'image':
        return PrivateImageMessagePresenter.toOutput(message)

      case 'multi_vcard':
        return PrivateMultiVCardMessagePresenter.toOutput(message)

      case 'revoked':
        return PrivateRevokedMessagePresenter.toOutput(message)

      case 'text':
        return PrivateTextMessagePresenter.toOutput(message)

      case 'vcard':
        return PrivateVCardMessagePresenter.toOutput(message)

      case 'video':
        return PrivateVideoMessagePresenter.toOutput(message)

      case 'voice':
        return PrivateVoiceMessagePresenter.toOutput(message)

      default:
        return PrivateUnknownMessagePresenter.toOutput(message)
    }
  }
}
