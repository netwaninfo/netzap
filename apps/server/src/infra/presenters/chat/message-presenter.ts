import { isPrivateMessage } from '@/domain/chat/enterprise/type-guards/message'
import { Message } from '@/domain/chat/enterprise/types/message'
import { Message as HttpMessage } from '@netzap/contracts/chat'
import { GroupMessagePresenter } from './group/message'
import { PrivateMessagePresenter } from './private/message'

export class MessagePresenter {
  static toHttp(message: Message): HttpMessage {
    if (isPrivateMessage(message)) {
      return PrivateMessagePresenter.toHttp(message)
    }

    return GroupMessagePresenter.toHttp(message)
  }
}
