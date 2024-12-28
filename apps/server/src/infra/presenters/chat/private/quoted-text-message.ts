import type { PrivateQuotedMessage as Output } from '@netzap/entities/chat'
import type { Except } from 'type-fest'

import { PrivateTextMessage } from '@/domain/chat/enterprise/entities/private/text-message.js'

export class PrivateQuotedTextMessagePresenter {
  static toOutput(message: Except<PrivateTextMessage, 'quoted'>): Output {
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
    }
  }
}
