import type { PrivateDocumentMessage as Output } from '@netzap/entities/chat'

import { PrivateDocumentMessage } from '@/domain/chat/enterprise/entities/private/document-message.js'
import { MessageMediaPresenter } from '../message-media-presenter.js'
import { PrivateQuotedMessagePresenter } from './quoted-message.js'

export class PrivateDocumentMessagePresenter {
  static toOutput(message: PrivateDocumentMessage): Output {
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
      quoted: message.hasQuoted()
        ? PrivateQuotedMessagePresenter.toOutput(message.quoted)
        : null,
      media: message.hasMedia()
        ? MessageMediaPresenter.toOutput(message.media)
        : null,
    }
  }
}
