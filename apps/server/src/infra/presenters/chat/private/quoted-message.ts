import type { PrivateQuotedMessage as Output } from '@netzap/entities/chat'
import type { Except } from 'type-fest'

import type { PrivateMessage } from '@/domain/chat/enterprise/types/message.js'
import { PrivateQuotedAudioMessagePresenter } from './quoted-audio-message.js'
import { PrivateQuotedDocumentMessagePresenter } from './quoted-document-message.js'
import { PrivateQuotedImageMessagePresenter } from './quoted-image-message.js'
import { PrivateQuotedMultiVCardMessagePresenter } from './quoted-multi-v-card-message.js'
import { PrivateQuotedTextMessagePresenter } from './quoted-text-message.js'
import { PrivateQuotedUnknownMessagePresenter } from './quoted-unknown-message.js'
import { PrivateQuotedVCardMessagePresenter } from './quoted-v-card-message.js'
import { PrivateQuotedVideoMessagePresenter } from './quoted-video-message.js'
import { PrivateQuotedVoiceMessagePresenter } from './quoted-voice-message.js'

export class PrivateQuotedMessagePresenter {
  static toOutput(message: Except<PrivateMessage, 'quoted'>): Output {
    switch (message.type) {
      case 'audio':
        return PrivateQuotedAudioMessagePresenter.toOutput(message)

      case 'document':
        return PrivateQuotedDocumentMessagePresenter.toOutput(message)

      case 'image':
        return PrivateQuotedImageMessagePresenter.toOutput(message)

      case 'multi_vcard':
        return PrivateQuotedMultiVCardMessagePresenter.toOutput(message)

      case 'revoked':
        throw new Error('Cannot quote a private revoked message')

      case 'text':
        return PrivateQuotedTextMessagePresenter.toOutput(message)

      case 'vcard':
        return PrivateQuotedVCardMessagePresenter.toOutput(message)

      case 'video':
        return PrivateQuotedVideoMessagePresenter.toOutput(message)

      case 'voice':
        return PrivateQuotedVoiceMessagePresenter.toOutput(message)

      default:
        return PrivateQuotedUnknownMessagePresenter.toOutput(message)
    }
  }
}
