import { GroupVoiceMessage } from '@/domain/chat/enterprise/entities/group/voice-message'
import { GroupQuotedMessage as Output } from '@netzap/entities/chat'
import { Except } from 'type-fest'
import { ContactPresenter } from '../contact-presenter'
import { MessageMediaPresenter } from '../message-media-presenter'

export class GroupQuotedVoiceMessagePresenter {
  static toOutput(message: Except<GroupVoiceMessage, 'quoted'>): Output {
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
      media: message.hasMedia()
        ? MessageMediaPresenter.toOutput(message.media)
        : null,
    }
  }
}
