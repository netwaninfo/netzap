import { isPrivateMessage } from '@/domain/chat/enterprise/type-guards/message'
import { Message } from '@/domain/chat/enterprise/types/message'
import { Message as Output } from '@netzap/entities/chat'
import { GroupMessagePresenter } from './group/message'
import { PrivateMessagePresenter } from './private/message'

export class MessagePresenter {
  static toOutput(message: Message): Output {
    if (isPrivateMessage(message)) {
      return PrivateMessagePresenter.toOutput(message)
    }

    return GroupMessagePresenter.toOutput(message)
  }
}
