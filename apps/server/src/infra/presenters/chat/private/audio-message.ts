import { PrivateAudioMessage } from '@/domain/chat/enterprise/entities/private/audio-message'
import { PrivateAudioMessage as HttpPrivateAudioMessage } from '@netzap/contracts/chat'
import { MessageMediaPresenter } from '../message-media-presenter'
import { PrivateQuotedMessagePresenter } from './quoted-message'

export class PrivateAudioMessagePresenter {
  static toHttp(message: PrivateAudioMessage): HttpPrivateAudioMessage {
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
      quoted: message.hasQuoted()
        ? PrivateQuotedMessagePresenter.toHttp(message.quoted)
        : null,
      media: MessageMediaPresenter.toHttp(message.media),
    }
  }
}