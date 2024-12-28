import type { GroupQuotedMessage as Output } from '@netzap/entities/chat'
import type { Except } from 'type-fest'

import { GroupVCardMessage } from '@/domain/chat/enterprise/entities/group/v-card-message.js'
import { ContactPresenter } from '../contact-presenter.js'

export class GroupQuotedVCardMessagePresenter {
  static toOutput(message: Except<GroupVCardMessage, 'quoted'>): Output {
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
      contact: ContactPresenter.toOutput(message.contact),
    }
  }
}
