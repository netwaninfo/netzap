import type { GroupQuotedMessage as Output } from '@netzap/entities/chat'
import type { Except } from 'type-fest'

import { GroupDocumentMessage } from '@/domain/chat/enterprise/entities/group/document-message.js'
import { ContactPresenter } from '../contact-presenter.js'
import { MessageMediaPresenter } from '../message-media-presenter.js'

export class GroupQuotedDocumentMessagePresenter {
  static toOutput(message: Except<GroupDocumentMessage, 'quoted'>): Output {
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
      media: message.hasMedia()
        ? MessageMediaPresenter.toOutput(message.media)
        : null,
    }
  }
}
