import { GroupRevokedMessage } from '@/domain/chat/enterprise/entities/group/revoked-message'
import { GroupRevokedMessage as Output } from '@netzap/entities/chat'
import { ContactPresenter } from '../contact-presenter'

export class GroupRevokedMessagePresenter {
  static toOutput(message: GroupRevokedMessage): Output {
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
      author: ContactPresenter.toOutput(message.author),
      sentBy: message.sentBy?.toString() ?? null,
      revokedAt: message.revokedAt,
      revokedBy: message.revokedBy?.toString() ?? null,
    }
  }
}
