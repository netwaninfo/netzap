import type { Chat as Output } from '@netzap/entities/chat'

import { isPrivateChat } from '@/domain/chat/enterprise/type-guards/chat.js'
import type { Chat } from '@/domain/chat/enterprise/types/chat.js'
import { GroupChatPresenter } from './group/chat-presenter.js'
import { PrivateChatPresenter } from './private/chat-presenter.js'

export class ChatPresenter {
  static toOutput(chat: Chat): Output {
    if (isPrivateChat(chat)) {
      return PrivateChatPresenter.toOutput(chat)
    }

    return GroupChatPresenter.toOutput(chat)
  }
}
