import { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat'
import { PrivateChat as Output } from '@netzap/entities/chat'
import { ContactPresenter } from '../contact-presenter'
import { PrivateMessagePresenter } from './message'

export class PrivateChatPresenter {
  static toOutput(chat: PrivateChat): Output {
    return {
      id: chat.id.toString(),
      type: 'private',
      contact: ContactPresenter.toOutput(chat.contact),
      instanceId: chat.instanceId.toString(),
      unreadCount: chat.unreadCount,
      waChatId: chat.waChatId.toString(),
      lastMessage: chat.hasLastMessage()
        ? PrivateMessagePresenter.toOutput(chat.lastMessage)
        : null,
      lastInteractionAt: chat.lastInteractionAt,
    }
  }
}
