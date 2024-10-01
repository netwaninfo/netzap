import { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat'
import { PrivateChat as Output } from '@netzap/entities/chat'
import { PrivateMessagePresenter } from './message'

export class PrivateChatPresenter {
  static toOutput(chat: PrivateChat): Output {
    return {
      id: chat.id.toString(),
      contactId: chat.contactId.toString(),
      instanceId: chat.instanceId.toString(),
      unreadCount: chat.unreadCount,
      waChatId: chat.waChatId.toString(),
      lastMessage: chat.hasLastMessage()
        ? PrivateMessagePresenter.toOutput(chat.lastMessage)
        : null,
    }
  }
}
