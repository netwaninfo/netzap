import type { PrivateTextMessage as Output } from '@netzap/entities/chat'

import { PrivateTextMessage } from '@/domain/chat/enterprise/entities/private/text-message.js'
import { PrivateQuotedMessagePresenter } from './quoted-message.js'

export class PrivateTextMessagePresenter {
  static toOutput(message: PrivateTextMessage): Output {
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
    }
  }
}
