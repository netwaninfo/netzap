import type { GroupQuotedMessage as Output } from '@netzap/entities/chat'
import type { Except } from 'type-fest'

import type { GroupMessage } from '@/domain/chat/enterprise/types/message.js'
import { GroupQuotedAudioMessagePresenter } from './quoted-audio-message.js'
import { GroupQuotedDocumentMessagePresenter } from './quoted-document-message.js'
import { GroupQuotedImageMessagePresenter } from './quoted-image-message.js'
import { GroupQuotedMultiVCardMessagePresenter } from './quoted-multi-v-card-message.js'
import { GroupQuotedTextMessagePresenter } from './quoted-text-message.js'
import { GroupQuotedUnknownMessagePresenter } from './quoted-unknown-message.js'
import { GroupQuotedVCardMessagePresenter } from './quoted-v-card-message.js'
import { GroupQuotedVideoMessagePresenter } from './quoted-video-message.js'
import { GroupQuotedVoiceMessagePresenter } from './quoted-voice-message.js'

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
