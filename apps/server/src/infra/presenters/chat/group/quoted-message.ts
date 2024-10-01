import { GroupMessage } from '@/domain/chat/enterprise/types/message'
import { GroupQuotedMessage as Output } from '@netzap/entities/chat'
import { Except } from 'type-fest'
import { GroupQuotedAudioMessagePresenter } from './quoted-audio-message'
import { GroupQuotedDocumentMessagePresenter } from './quoted-document-message'
import { GroupQuotedImageMessagePresenter } from './quoted-image-message'
import { GroupQuotedMultiVCardMessagePresenter } from './quoted-multi-v-card-message'
import { GroupQuotedTextMessagePresenter } from './quoted-text-message'
import { GroupQuotedUnknownMessagePresenter } from './quoted-unknown-message'
import { GroupQuotedVCardMessagePresenter } from './quoted-v-card-message'
import { GroupQuotedVideoMessagePresenter } from './quoted-video-message'
import { GroupQuotedVoiceMessagePresenter } from './quoted-voice-message'

export class GroupQuotedMessagePresenter {
  static toOutput(message: Except<GroupMessage, 'quoted'>): Output {
    switch (message.type) {
      case 'audio':
        return GroupQuotedAudioMessagePresenter.toOutput(message)

      case 'document':
        return GroupQuotedDocumentMessagePresenter.toOutput(message)

      case 'image':
        return GroupQuotedImageMessagePresenter.toOutput(message)

      case 'multi_vcard':
        return GroupQuotedMultiVCardMessagePresenter.toOutput(message)

      case 'revoked':
        throw new Error('Cannot quote a group revoked message')

      case 'text':
        return GroupQuotedTextMessagePresenter.toOutput(message)

      case 'vcard':
        return GroupQuotedVCardMessagePresenter.toOutput(message)

      case 'video':
        return GroupQuotedVideoMessagePresenter.toOutput(message)

      case 'voice':
        return GroupQuotedVoiceMessagePresenter.toOutput(message)

      default:
        return GroupQuotedUnknownMessagePresenter.toOutput(message)
    }
  }
}
