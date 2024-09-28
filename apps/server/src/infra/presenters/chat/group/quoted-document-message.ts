import { GroupDocumentMessage } from '@/domain/chat/enterprise/entities/group/document-message'
import { GroupQuotedMessage } from '@netzap/contracts/chat'
import { Except } from 'type-fest'
import { ContactPresenter } from '../contact-presenter'
import { MessageMediaPresenter } from '../message-media-presenter'

export class GroupQuotedDocumentMessagePresenter {
  static toHttp(
    message: Except<GroupDocumentMessage, 'quoted'>
  ): GroupQuotedMessage {
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
      author: ContactPresenter.toHttp(message.author),
      sentBy: message.sentBy?.toString() ?? null,
      body: message.body,
      media: message.hasMedia()
        ? MessageMediaPresenter.toHttp(message.media)
        : null,
    }
  }
}
