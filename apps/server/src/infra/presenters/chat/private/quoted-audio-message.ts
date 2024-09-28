import { PrivateAudioMessage } from '@/domain/chat/enterprise/entities/private/audio-message'
import { PrivateQuotedMessage } from '@netzap/contracts/chat'
import { Except } from 'type-fest'
import { MessageMediaPresenter } from '../message-media-presenter'

export class PrivateQuotedAudioMessagePresenter {
  static toHttp(
    message: Except<PrivateAudioMessage, 'quoted'>
  ): PrivateQuotedMessage {
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
      media: message.hasMedia()
        ? MessageMediaPresenter.toHttp(message.media)
        : null,
    }
  }
}
