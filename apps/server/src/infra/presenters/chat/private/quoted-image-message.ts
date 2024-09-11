import { PrivateImageMessage } from '@/domain/chat/enterprise/entities/private/image-message'
import { PrivateQuotedImageMessage } from '@netzap/contracts/chat'
import { Except } from 'type-fest'
import { MessageMediaPresenter } from '../message-media-presenter'

export class PrivateQuotedImageMessagePresenter {
  static toHttp(
    message: Except<PrivateImageMessage, 'quoted'>
  ): PrivateQuotedImageMessage {
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
      sentBy: message.sentBy?.toString() ?? null,
      body: message.body,
      media: MessageMediaPresenter.toHttp(message.media),
    }
  }
}
