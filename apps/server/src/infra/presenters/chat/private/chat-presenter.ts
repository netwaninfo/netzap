import { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat'
import { PrivateChat as HttpPrivateChat } from '@netzap/contracts/chat'
import { PrivateMessagePresenter } from './message'

export class PrivateChatPresenter {
  static toHttp(chat: PrivateChat): HttpPrivateChat {
    return {
      id: chat.id.toString(),
      contactId: chat.contactId.toString(),
      instanceId: chat.instanceId.toString(),
      unreadCount: chat.unreadCount,
      waChatId: chat.waChatId.toString(),
      lastMessage: chat.hasLastMessage()
        ? PrivateMessagePresenter.toHttp(chat.lastMessage)
        : null,
    }
  }
}
