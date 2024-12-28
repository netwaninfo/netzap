import type { PrivateAudioMessage as Output } from '@netzap/entities/chat'

import { PrivateAudioMessage } from '@/domain/chat/enterprise/entities/private/audio-message.js'
import { MessageMediaPresenter } from '../message-media-presenter.js'
import { PrivateQuotedMessagePresenter } from './quoted-message.js'

export class PrivateAudioMessagePresenter {
  static toOutput(message: PrivateAudioMessage): Output {
    return {
      id: message.id.toString(),
      chatId: message.chatId.toString(),
      waChatId: message.waChatId.toString(),
      chatType: message.chatType,
      instanceId: message.instanceId.toString(),
      waMessageId: message.waMessageId.toString(),
      type: message.type,
      status: message.status,
      isForwarded: message.isForwarded,
      isFromMe: message.isFromMe,
      createdAt: message.createdAt,
      sentBy: message.sentBy?.toString() ?? null,
      quoted: message.hasQuoted()
        ? PrivateQuotedMessagePresenter.toOutput(message.quoted)
        : null,
      media: message.hasMedia()
        ? MessageMediaPresenter.toOutput(message.media)
        : null,
    }
  }
}
