import type { Message as Output } from '@netzap/entities/chat'

import { isPrivateMessage } from '@/domain/chat/enterprise/type-guards/message.js'
import type { Message } from '@/domain/chat/enterprise/types/message.js'
import { GroupMessagePresenter } from './group/message.js'
import { PrivateMessagePresenter } from './private/message.js'

export class MessagePresenter {
  static toOutput(message: Message): Output {
    if (isPrivateMessage(message)) {
      return PrivateMessagePresenter.toOutput(message)
    }

    return GroupMessagePresenter.toOutput(message)
  }
}
