import type { GroupVoiceMessage as Output } from '@netzap/entities/chat'

import { GroupVoiceMessage } from '@/domain/chat/enterprise/entities/group/voice-message.js'
import { ContactPresenter } from '../contact-presenter.js'
import { MessageMediaPresenter } from '../message-media-presenter.js'
import { GroupQuotedMessagePresenter } from './quoted-message.js'

export class GroupVoiceMessagePresenter {
  static toOutput(message: GroupVoiceMessage): Output {
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
      quoted: message.hasQuoted()
        ? GroupQuotedMessagePresenter.toOutput(message.quoted)
        : null,
      media: message.hasMedia()
        ? MessageMediaPresenter.toOutput(message.media)
        : null,
    }
  }
}
