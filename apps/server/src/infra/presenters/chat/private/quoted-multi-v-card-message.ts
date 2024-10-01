import { PrivateMultiVCardMessage } from '@/domain/chat/enterprise/entities/private/multi-v-card-message'
import { PrivateQuotedMessage as Output } from '@netzap/entities/chat'
import { Except } from 'type-fest'
import { ContactPresenter } from '../contact-presenter'

export class PrivateQuotedMultiVCardMessagePresenter {
  static toOutput(message: Except<PrivateMultiVCardMessage, 'quoted'>): Output {
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
      sentBy: message.sentBy?.toString() ?? null,
      contacts: message.contacts.map(ContactPresenter.toOutput),
    }
  }
}
