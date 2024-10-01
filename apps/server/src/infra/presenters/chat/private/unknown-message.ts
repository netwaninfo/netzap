import { PrivateUnknownMessage } from '@/domain/chat/enterprise/entities/private/unknown-message'
import { PrivateUnknownMessage as Output } from '@netzap/entities/chat'
import { PrivateQuotedMessagePresenter } from './quoted-message'

export class PrivateUnknownMessagePresenter {
  static toOutput(message: PrivateUnknownMessage): Output {
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
      quoted: message.hasQuoted()
        ? PrivateQuotedMessagePresenter.toOutput(message.quoted)
        : null,
    }
  }
}
