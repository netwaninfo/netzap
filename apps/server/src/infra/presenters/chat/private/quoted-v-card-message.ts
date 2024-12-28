import type { PrivateQuotedMessage as Output } from '@netzap/entities/chat'
import type { Except } from 'type-fest'

import { PrivateVCardMessage } from '@/domain/chat/enterprise/entities/private/v-card-message.js'
import { ContactPresenter } from '../contact-presenter.js'

export class PrivateQuotedVCardMessagePresenter {
  static toOutput(message: Except<PrivateVCardMessage, 'quoted'>): Output {
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
      contact: ContactPresenter.toOutput(message.contact),
    }
  }
}
