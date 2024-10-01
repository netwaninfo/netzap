import { GroupUnknownMessage } from '@/domain/chat/enterprise/entities/group/unknown-message'
import { GroupQuotedMessage as Output } from '@netzap/entities/chat'
import { Except } from 'type-fest'
import { ContactPresenter } from '../contact-presenter'

export class GroupQuotedUnknownMessagePresenter {
  static toOutput(message: Except<GroupUnknownMessage, 'quoted'>): Output {
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
    }
  }
}
