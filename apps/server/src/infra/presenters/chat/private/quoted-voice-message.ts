import { PrivateVoiceMessage } from '@/domain/chat/enterprise/entities/private/voice-message'
import { PrivateQuotedVoiceMessage } from '@netzap/contracts/chat'
import { Except } from 'type-fest'
import { MessageMediaPresenter } from '../message-media-presenter'

export class PrivateQuotedVoiceMessagePresenter {
  static toHttp(
    message: Except<PrivateVoiceMessage, 'quoted'>
  ): PrivateQuotedVoiceMessage {
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
      media: MessageMediaPresenter.toHttp(message.media),
    }
  }
}
