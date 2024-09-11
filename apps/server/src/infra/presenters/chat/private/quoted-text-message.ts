import { PrivateTextMessage } from '@/domain/chat/enterprise/entities/private/text-message'
import { PrivateQuotedTextMessage } from '@netzap/contracts/chat'
import { Except } from 'type-fest'

export class PrivateQuotedTextMessagePresenter {
  static toHttp(
    message: Except<PrivateTextMessage, 'quoted'>
  ): PrivateQuotedTextMessage {
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
