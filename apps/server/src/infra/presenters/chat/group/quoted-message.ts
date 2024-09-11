import { GroupMessage } from '@/domain/chat/enterprise/types/message'
import { GroupQuotedMessage } from '@netzap/contracts/chat'
import { Except } from 'type-fest'
import { GroupQuotedAudioMessagePresenter } from './quoted-audio-message'
import { GroupQuotedDocumentMessagePresenter } from './quoted-document-message'
import { GroupQuotedImageMessagePresenter } from './quoted-image-message'
import { GroupQuotedMultiVCardMessagePresenter } from './quoted-multi-v-card-message'
import { GroupQuotedRevokedMessagePresenter } from './quoted-revoked-message'
import { GroupQuotedTextMessagePresenter } from './quoted-text-message'
import { GroupQuotedUnknownMessagePresenter } from './quoted-unknown-message'
import { GroupQuotedVCardMessagePresenter } from './quoted-v-card-message'
import { GroupQuotedVideoMessagePresenter } from './quoted-video-message'
import { GroupQuotedVoiceMessagePresenter } from './quoted-voice-message'

export class GroupQuotedMessagePresenter {
  static toHttp(message: Except<GroupMessage, 'quoted'>): GroupQuotedMessage {
    switch (message.type) {
      case 'audio':
        return GroupQuotedAudioMessagePresenter.toHttp(message)

      case 'document':
        return GroupQuotedDocumentMessagePresenter.toHttp(message)

      case 'image':
        return GroupQuotedImageMessagePresenter.toHttp(message)

      case 'multi_vcard':
        return GroupQuotedMultiVCardMessagePresenter.toHttp(message)

      case 'revoked':
        return GroupQuotedRevokedMessagePresenter.toHttp(message)

      case 'text':
        return GroupQuotedTextMessagePresenter.toHttp(message)

      case 'vcard':
        return GroupQuotedVCardMessagePresenter.toHttp(message)

      case 'video':
        return GroupQuotedVideoMessagePresenter.toHttp(message)

      case 'voice':
        return GroupQuotedVoiceMessagePresenter.toHttp(message)

      default:
        return GroupQuotedUnknownMessagePresenter.toHttp(message)
    }
  }
}
