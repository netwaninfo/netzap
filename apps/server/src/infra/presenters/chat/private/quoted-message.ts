import { PrivateMessage } from '@/domain/chat/enterprise/types/message'
import { PrivateQuotedMessage } from '@netzap/contracts/chat'
import { Except } from 'type-fest'
import { PrivateQuotedAudioMessagePresenter } from './quoted-audio-message'
import { PrivateQuotedDocumentMessagePresenter } from './quoted-document-message'
import { PrivateQuotedImageMessagePresenter } from './quoted-image-message'
import { PrivateQuotedMultiVCardMessagePresenter } from './quoted-multi-v-card-message'
import { PrivateQuotedRevokedMessagePresenter } from './quoted-revoked-message'
import { PrivateQuotedTextMessagePresenter } from './quoted-text-message'
import { PrivateQuotedUnknownMessagePresenter } from './quoted-unknown-message'
import { PrivateQuotedVCardMessagePresenter } from './quoted-v-card-message'
import { PrivateQuotedVideoMessagePresenter } from './quoted-video-message'
import { PrivateQuotedVoiceMessagePresenter } from './quoted-voice-message'

export class PrivateQuotedMessagePresenter {
  static toHttp(
    message: Except<PrivateMessage, 'quoted'>
  ): PrivateQuotedMessage {
    switch (message.type) {
      case 'audio':
        return PrivateQuotedAudioMessagePresenter.toHttp(message)

      case 'document':
        return PrivateQuotedDocumentMessagePresenter.toHttp(message)

      case 'image':
        return PrivateQuotedImageMessagePresenter.toHttp(message)

      case 'multi_vcard':
        return PrivateQuotedMultiVCardMessagePresenter.toHttp(message)

      case 'revoked':
        return PrivateQuotedRevokedMessagePresenter.toHttp(message)

      case 'text':
        return PrivateQuotedTextMessagePresenter.toHttp(message)

      case 'vcard':
        return PrivateQuotedVCardMessagePresenter.toHttp(message)

      case 'video':
        return PrivateQuotedVideoMessagePresenter.toHttp(message)

      case 'voice':
        return PrivateQuotedVoiceMessagePresenter.toHttp(message)

      default:
        return PrivateQuotedUnknownMessagePresenter.toHttp(message)
    }
  }
}
