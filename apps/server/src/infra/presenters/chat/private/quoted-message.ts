import { PrivateMessage } from '@/domain/chat/enterprise/types/message'
import { PrivateQuotedMessage as Output } from '@netzap/entities/chat'
import { Except } from 'type-fest'
import { PrivateQuotedAudioMessagePresenter } from './quoted-audio-message'
import { PrivateQuotedDocumentMessagePresenter } from './quoted-document-message'
import { PrivateQuotedImageMessagePresenter } from './quoted-image-message'
import { PrivateQuotedMultiVCardMessagePresenter } from './quoted-multi-v-card-message'
import { PrivateQuotedTextMessagePresenter } from './quoted-text-message'
import { PrivateQuotedUnknownMessagePresenter } from './quoted-unknown-message'
import { PrivateQuotedVCardMessagePresenter } from './quoted-v-card-message'
import { PrivateQuotedVideoMessagePresenter } from './quoted-video-message'
import { PrivateQuotedVoiceMessagePresenter } from './quoted-voice-message'

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
