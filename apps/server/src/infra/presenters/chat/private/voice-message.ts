import { PrivateVoiceMessage } from '@/domain/chat/enterprise/entities/private/voice-message'
import { PrivateVoiceMessage as Output } from '@netzap/entities/chat'
import { MessageMediaPresenter } from '../message-media-presenter'
import { PrivateQuotedMessagePresenter } from './quoted-message'

export class PrivateVoiceMessagePresenter {
  static toOutput(message: PrivateVoiceMessage): Output {
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
        ? PrivateQuotedMessagePresenter.toOutput(message.quoted)
        : null,
      media: message.hasMedia()
        ? MessageMediaPresenter.toOutput(message.media)
        : null,
    }
  }
}
