import { GroupChat } from '@/domain/chat/enterprise/entities/group/chat'
import { GroupChat as HttpGroupChat } from '@netzap/contracts/chat'
import { GroupMessagePresenter } from './message'

export class GroupChatPresenter {
  static toHttp(chat: GroupChat): HttpGroupChat {
    return {
      id: chat.id.toString(),
      groupId: chat.groupId.toString(),
      instanceId: chat.instanceId.toString(),
      unreadCount: chat.unreadCount,
      waChatId: chat.waChatId.toString(),
      lastMessage: chat.hasLastMessage()
        ? GroupMessagePresenter.toHttp(chat.lastMessage)
        : null,
    }
  }
}
