import { PrivateRevokedMessage } from '@/domain/chat/enterprise/entities/private/revoked-message'
import { PrivateQuotedRevokedMessage } from '@netzap/contracts/chat'
import { Except } from 'type-fest'

export class PrivateQuotedRevokedMessagePresenter {
  static toHttp(
    message: Except<PrivateRevokedMessage, 'quoted'>
  ): PrivateQuotedRevokedMessage {
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
      revokedAt: message.revokedAt,
      revokedBy: message.revokedBy?.toString() ?? null,
    }
  }
}
