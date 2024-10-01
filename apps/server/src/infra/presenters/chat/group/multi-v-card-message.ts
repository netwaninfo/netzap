import { GroupMultiVCardMessage } from '@/domain/chat/enterprise/entities/group/multi-v-card-message'
import { GroupMultiVCardMessage as Output } from '@netzap/entities/chat'
import { ContactPresenter } from '../contact-presenter'
import { GroupQuotedMessagePresenter } from './quoted-message'

export class GroupMultiVCardMessagePresenter {
  static toOutput(message: GroupMultiVCardMessage): Output {
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
      author: ContactPresenter.toOutput(message.author),
      sentBy: message.sentBy?.toString() ?? null,
      quoted: message.hasQuoted()
        ? GroupQuotedMessagePresenter.toOutput(message.quoted)
        : null,
      contacts: message.contacts.map(ContactPresenter.toOutput),
    }
  }
}
