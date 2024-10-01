import { GroupMessage } from '@/domain/chat/enterprise/types/message'
import { GroupMessage as Output } from '@netzap/entities/chat'
import { GroupAudioMessagePresenter } from './audio-message'
import { GroupDocumentMessagePresenter } from './document-message'
import { GroupImageMessagePresenter } from './image-message'
import { GroupMultiVCardMessagePresenter } from './multi-v-card-message'
import { GroupRevokedMessagePresenter } from './revoked-message'
import { GroupTextMessagePresenter } from './text-message'
import { GroupUnknownMessagePresenter } from './unknown-message'
import { GroupVCardMessagePresenter } from './v-card-message'
import { GroupVideoMessagePresenter } from './video-message'
import { GroupVoiceMessagePresenter } from './voice-message'

export class GroupMessagePresenter {
  static toOutput(message: GroupMessage): Output {
    switch (message.type) {
      case 'audio':
        return GroupAudioMessagePresenter.toOutput(message)

      case 'document':
        return GroupDocumentMessagePresenter.toOutput(message)

      case 'image':
        return GroupImageMessagePresenter.toOutput(message)

      case 'multi_vcard':
        return GroupMultiVCardMessagePresenter.toOutput(message)

      case 'revoked':
        return GroupRevokedMessagePresenter.toOutput(message)

      case 'text':
        return GroupTextMessagePresenter.toOutput(message)

      case 'vcard':
        return GroupVCardMessagePresenter.toOutput(message)

      case 'video':
        return GroupVideoMessagePresenter.toOutput(message)

      case 'voice':
        return GroupVoiceMessagePresenter.toOutput(message)

      default:
        return GroupUnknownMessagePresenter.toOutput(message)
    }
  }
}
