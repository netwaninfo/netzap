import type { GroupQuotedMessage as Output } from '@netzap/entities/chat'
import type { Except } from 'type-fest'

import { GroupMultiVCardMessage } from '@/domain/chat/enterprise/entities/group/multi-v-card-message.js'
import { ContactPresenter } from '../contact-presenter.js'

export class GroupQuotedMultiVCardMessagePresenter {
  static toOutput(message: Except<GroupMultiVCardMessage, 'quoted'>): Output {
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
      contacts: message.contacts.map(ContactPresenter.toOutput),
    }
  }
}
