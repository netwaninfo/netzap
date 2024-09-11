import { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat'
import { PrivateChat as HttpPrivateChat } from '@netzap/contracts/chat'

export class PrivateChatPresenter {
  static toHttp(chat: PrivateChat): HttpPrivateChat {
    return {
      id: chat.id.toString(),
      contactId: chat.contactId.toString(),
      instanceId: chat.instanceId.toString(),
      lastMessage: null, // TODO: Replace by PrivateMessagePresenter
      unreadCount: chat.unreadCount,
      waChatId: chat.waChatId.toString(),
    }
  }
}
