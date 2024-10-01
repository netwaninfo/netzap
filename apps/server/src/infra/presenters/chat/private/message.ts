import { PrivateMessage } from '@/domain/chat/enterprise/types/message'
import { PrivateMessage as Output } from '@netzap/entities/chat'
import { PrivateAudioMessagePresenter } from './audio-message'
import { PrivateDocumentMessagePresenter } from './document-message'
import { PrivateImageMessagePresenter } from './image-message'
import { PrivateMultiVCardMessagePresenter } from './multi-v-card-message'
import { PrivateRevokedMessagePresenter } from './revoked-message'
import { PrivateTextMessagePresenter } from './text-message'
import { PrivateUnknownMessagePresenter } from './unknown-message'
import { PrivateVCardMessagePresenter } from './v-card-message'
import { PrivateVideoMessagePresenter } from './video-message'
import { PrivateVoiceMessagePresenter } from './voice-message'

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
