import { GroupVCardMessage } from '@/domain/chat/enterprise/entities/group/v-card-message'
import { GroupVCardMessage as Output } from '@netzap/entities/chat'
import { ContactPresenter } from '../contact-presenter'
import { GroupQuotedMessagePresenter } from './quoted-message'

export class GroupVCardMessagePresenter {
  static toOutput(message: GroupVCardMessage): Output {
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
      author: ContactPresenter.toOutput(message.author),
      sentBy: message.sentBy?.toString() ?? null,
      quoted: message.hasQuoted()
        ? GroupQuotedMessagePresenter.toOutput(message.quoted)
        : null,
      contact: ContactPresenter.toOutput(message.contact),
    }
  }
}
