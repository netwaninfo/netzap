import { PrivateTextMessage } from '@/domain/chat/enterprise/entities/private/text-message'
import { PrivateQuotedMessage as Output } from '@netzap/entities/chat'
import { Except } from 'type-fest'

export class PrivateQuotedTextMessagePresenter {
  static toOutput(message: Except<PrivateTextMessage, 'quoted'>): Output {
    return {
      id: message.id.toString(),
      chatId: message.chatId.toString(),
      waChatId: message.waChatId.toString(),
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
