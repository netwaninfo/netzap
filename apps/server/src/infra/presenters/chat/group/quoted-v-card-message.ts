import { GroupVCardMessage } from '@/domain/chat/enterprise/entities/group/v-card-message'
import { GroupQuotedMessage } from '@netzap/contracts/chat'
import { Except } from 'type-fest'
import { ContactPresenter } from '../contact-presenter'

export class GroupQuotedVCardMessagePresenter {
  static toHttp(
    message: Except<GroupVCardMessage, 'quoted'>
  ): GroupQuotedMessage {
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
      contact: ContactPresenter.toHttp(message.contact),
    }
  }
}
