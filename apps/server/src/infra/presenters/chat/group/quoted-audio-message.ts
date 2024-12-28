import type { GroupQuotedMessage as Output } from '@netzap/entities/chat'
import type { Except } from 'type-fest'

import { GroupAudioMessage } from '@/domain/chat/enterprise/entities/group/audio-message.js'
import { ContactPresenter } from '../contact-presenter.js'
import { MessageMediaPresenter } from '../message-media-presenter.js'

export class GroupQuotedAudioMessagePresenter {
  static toOutput(message: Except<GroupAudioMessage, 'quoted'>): Output {
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
