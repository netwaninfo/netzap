import type { PrivateMultiVCardMessage as Output } from '@netzap/entities/chat'

import { PrivateMultiVCardMessage } from '@/domain/chat/enterprise/entities/private/multi-v-card-message.js'
import { ContactPresenter } from '../contact-presenter.js'
import { PrivateQuotedMessagePresenter } from './quoted-message.js'

export class PrivateMultiVCardMessagePresenter {
  static toOutput(message: PrivateMultiVCardMessage): Output {
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
      contacts: message.contacts.map(ContactPresenter.toOutput),
    }
  }
}
