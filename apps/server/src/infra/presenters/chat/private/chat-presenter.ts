import type { PrivateChat as Output } from '@netzap/entities/chat'

import { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat.js'
import { ContactPresenter } from '../contact-presenter.js'
import { PrivateMessagePresenter } from './message.js'

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
