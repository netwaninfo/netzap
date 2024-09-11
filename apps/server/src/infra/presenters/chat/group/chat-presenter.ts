import { GroupChat } from '@/domain/chat/enterprise/entities/group/chat'
import { GroupChat as HttpGroupChat } from '@netzap/contracts/chat'

export class GroupChatPresenter {
  static toHttp(chat: GroupChat): HttpGroupChat {
    return {
      id: chat.id.toString(),
      groupId: chat.groupId.toString(),
      instanceId: chat.instanceId.toString(),
      lastMessage: null, // TODO: Replace by GroupMessagePresenter
      unreadCount: chat.unreadCount,
      waChatId: chat.waChatId.toString(),
    }
  }
}
