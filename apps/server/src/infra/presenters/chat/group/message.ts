import type { GroupMessage as Output } from '@netzap/entities/chat'

import type { GroupMessage } from '@/domain/chat/enterprise/types/message.js'
import { GroupAudioMessagePresenter } from './audio-message.js'
import { GroupDocumentMessagePresenter } from './document-message.js'
import { GroupImageMessagePresenter } from './image-message.js'
import { GroupMultiVCardMessagePresenter } from './multi-v-card-message.js'
import { GroupRevokedMessagePresenter } from './revoked-message.js'
import { GroupTextMessagePresenter } from './text-message.js'
import { GroupUnknownMessagePresenter } from './unknown-message.js'
import { GroupVCardMessagePresenter } from './v-card-message.js'
import { GroupVideoMessagePresenter } from './video-message.js'
import { GroupVoiceMessagePresenter } from './voice-message.js'

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
