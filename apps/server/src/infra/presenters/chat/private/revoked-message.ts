import { PrivateRevokedMessage } from '@/domain/chat/enterprise/entities/private/revoked-message'
import { PrivateRevokedMessage as Output } from '@netzap/entities/chat'

export class PrivateRevokedMessagePresenter {
  static toOutput(message: PrivateRevokedMessage): Output {
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
      sentBy: message.sentBy?.toString() ?? null,
      revokedAt: message.revokedAt,
      revokedBy: message.revokedBy?.toString() ?? null,
    }
  }
}
