import type { GroupRevokedMessage as Output } from '@netzap/entities/chat'

import { GroupRevokedMessage } from '@/domain/chat/enterprise/entities/group/revoked-message.js'
import { ContactPresenter } from '../contact-presenter.js'

export class GroupRevokedMessagePresenter {
  static toOutput(message: GroupRevokedMessage): Output {
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
      revokedAt: message.revokedAt,
      revokedBy: message.revokedBy?.toString() ?? null,
    }
  }
}
