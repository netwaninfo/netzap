import { PrivateTextMessage } from '@/domain/chat/enterprise/entities/private/text-message'
import { PrivateTextMessage as HttpPrivateTextMessage } from '@netzap/contracts/chat'
import { PrivateQuotedMessagePresenter } from './quoted-message'

export class PrivateTextMessagePresenter {
  static toHttp(message: PrivateTextMessage): HttpPrivateTextMessage {
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
      quoted: message.hasQuoted()
        ? PrivateQuotedMessagePresenter.toHttp(message.quoted)
        : null,
    }
  }
}
