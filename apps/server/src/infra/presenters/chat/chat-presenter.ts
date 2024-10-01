import { isPrivateChat } from '@/domain/chat/enterprise/type-guards/chat'
import { Chat } from '@/domain/chat/enterprise/types/chat'
import { Chat as Output } from '@netzap/entities/chat'
import { GroupChatPresenter } from './group/chat-presenter'
import { PrivateChatPresenter } from './private/chat-presenter'

export class ChatPresenter {
  static toOutput(chat: Chat): Output {
    if (isPrivateChat(chat)) {
      return PrivateChatPresenter.toOutput(chat)
    }

    return GroupChatPresenter.toOutput(chat)
  }
}
