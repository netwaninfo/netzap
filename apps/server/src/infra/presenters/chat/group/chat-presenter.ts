import { GroupChat } from '@/domain/chat/enterprise/entities/group/chat'
import { GroupChat as Output } from '@netzap/entities/chat'
import { GroupPresenter } from '../group-presenter'
import { GroupMessagePresenter } from './message'

export class GroupChatPresenter {
  static toOutput(chat: GroupChat): Output {
    return {
      id: chat.id.toString(),
      type: 'group',
      group: GroupPresenter.toOutput(chat.group),
      instanceId: chat.instanceId.toString(),
      unreadCount: chat.unreadCount,
      waChatId: chat.waChatId.toString(),
      lastMessage: chat.hasLastMessage()
        ? GroupMessagePresenter.toOutput(chat.lastMessage)
        : null,
      lastInteractionAt: chat.lastInteractionAt,
    }
  }
}
