import { GroupDocumentMessage } from '@/domain/chat/enterprise/entities/group/document-message'
import { GroupDocumentMessage as Output } from '@netzap/entities/chat'
import { ContactPresenter } from '../contact-presenter'
import { MessageMediaPresenter } from '../message-media-presenter'
import { GroupQuotedMessagePresenter } from './quoted-message'

export class GroupDocumentMessagePresenter {
  static toOutput(message: GroupDocumentMessage): Output {
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
      media: message.hasMedia()
        ? MessageMediaPresenter.toOutput(message.media)
        : null,
    }
  }
}
