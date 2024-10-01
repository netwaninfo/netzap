import { PrivateVoiceMessage } from '@/domain/chat/enterprise/entities/private/voice-message'
import { PrivateQuotedMessage as Output } from '@netzap/entities/chat'
import { Except } from 'type-fest'
import { MessageMediaPresenter } from '../message-media-presenter'

export class PrivateQuotedVoiceMessagePresenter {
  static toOutput(message: Except<PrivateVoiceMessage, 'quoted'>): Output {
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
        ? MessageMediaPresenter.toOutput(message.media)
        : null,
    }
  }
}
