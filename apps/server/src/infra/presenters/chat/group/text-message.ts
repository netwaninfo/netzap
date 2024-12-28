import type { GroupTextMessage as Output } from '@netzap/entities/chat'

import { GroupTextMessage } from '@/domain/chat/enterprise/entities/group/text-message.js'
import { ContactPresenter } from '../contact-presenter.js'
import { GroupQuotedMessagePresenter } from './quoted-message.js'

export class GroupTextMessagePresenter {
  static toOutput(message: GroupTextMessage): Output {
    return {
      id: message.id.toString(),
      chatId: message.chatId.toString(),
      waChatId: message.waChatId.toString(),
      chatType: message.chatType,
      instanceId: message.instanceId.toString(),
      waMessageId: message.waMessageId.toString(),
      type: message.type,
      status: message.status,
      isForwarded: message.isForwarded,
      isFromMe: message.isFromMe,
      createdAt: message.createdAt,
      author: ContactPresenter.toOutput(message.author),
      sentBy: message.sentBy?.toString() ?? null,
      body: message.body,
      quoted: message.hasQuoted()
        ? GroupQuotedMessagePresenter.toOutput(message.quoted)
        : null,
    }
  }
}
