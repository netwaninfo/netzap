import { PrivateImageMessage } from '@/domain/chat/enterprise/entities/private/image-message'
import { PrivateImageMessage as HttpPrivateImageMessage } from '@netzap/contracts/chat'
import { MessageMediaPresenter } from '../message-media-presenter'
import { PrivateQuotedMessagePresenter } from './quoted-message'

export class PrivateImageMessagePresenter {
  static toHttp(message: PrivateImageMessage): HttpPrivateImageMessage {
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
      quoted: message.hasQuoted()
        ? PrivateQuotedMessagePresenter.toHttp(message.quoted)
        : null,
      media: MessageMediaPresenter.toHttp(message.media),
    }
  }
}
