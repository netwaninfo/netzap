import type { PrivateQuotedMessage as Output } from '@netzap/entities/chat'
import type { Except } from 'type-fest'

import { PrivateImageMessage } from '@/domain/chat/enterprise/entities/private/image-message.js'
import { MessageMediaPresenter } from '../message-media-presenter.js'

export class PrivateQuotedImageMessagePresenter {
  static toOutput(message: Except<PrivateImageMessage, 'quoted'>): Output {
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
      body: message.body,
      media: message.hasMedia()
        ? MessageMediaPresenter.toOutput(message.media)
        : null,
    }
  }
}
