import { GroupVCardMessage } from '@/domain/chat/enterprise/entities/group/v-card-message'
import { GroupVCardMessage as HttpGroupVCardMessage } from '@netzap/contracts/chat'
import { ContactPresenter } from '../contact-presenter'
import { GroupQuotedMessagePresenter } from './quoted-message'

export class GroupVCardMessagePresenter {
  static toHttp(message: GroupVCardMessage): HttpGroupVCardMessage {
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
      author: ContactPresenter.toHttp(message.author),
      sentBy: message.sentBy?.toString() ?? null,
      quoted: message.hasQuoted()
        ? GroupQuotedMessagePresenter.toHttp(message.quoted)
        : null,
      contact: ContactPresenter.toHttp(message.contact),
    }
  }
}
