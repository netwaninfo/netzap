import { PrivateVCardMessage } from '@/domain/chat/enterprise/entities/private/v-card-message'
import { PrivateVCardMessage as Output } from '@netzap/entities/chat'
import { ContactPresenter } from '../contact-presenter'
import { PrivateQuotedMessagePresenter } from './quoted-message'

export class PrivateVCardMessagePresenter {
  static toOutput(message: PrivateVCardMessage): Output {
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
      contact: ContactPresenter.toOutput(message.contact),
    }
  }
}
