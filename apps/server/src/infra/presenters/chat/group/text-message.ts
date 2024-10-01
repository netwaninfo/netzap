import { GroupTextMessage } from '@/domain/chat/enterprise/entities/group/text-message'
import { GroupTextMessage as Output } from '@netzap/entities/chat'
import { ContactPresenter } from '../contact-presenter'
import { GroupQuotedMessagePresenter } from './quoted-message'

export class GroupTextMessagePresenter {
  static toOutput(message: GroupTextMessage): Output {
    return {
      id: message.id.toString(),
      chatId: message.chatId.toString(),
      waChatId: message.waChatId.toString(),
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
