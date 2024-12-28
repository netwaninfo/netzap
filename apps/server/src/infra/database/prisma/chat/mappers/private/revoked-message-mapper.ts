import type { Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { PrivateRevokedMessage } from '@/domain/chat/enterprise/entities/private/revoked-message.js'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id.js'
import type { RawPrivateMessage } from './message-mapper.js'

type Raw = RawPrivateMessage

export class PrismaPrivateRevokedMessageMapper {
  static toDomain(raw: Raw): PrivateRevokedMessage {
    return PrivateRevokedMessage.create(
      {
        status: raw.status,
        chatId: UniqueEntityID.create(raw.chatId),
        instanceId: UniqueEntityID.create(raw.instanceId),
        waChatId: WAEntityID.createFromString(raw.waChatId),
        waMessageId: WAMessageID.createFromString(raw.waMessageId),
        isForwarded: raw.isForwarded,
        isFromMe: raw.isFromMe,
        createdAt: raw.createdAt,
        revokedAt: raw.revokedAt ?? raw.createdAt,
        ...(raw.senderId && { sentBy: UniqueEntityID.create(raw.senderId) }),
        ...(raw.revokerId && { sentBy: UniqueEntityID.create(raw.revokerId) }),
      },
      UniqueEntityID.create(raw.id)
    )
  }

  static toPrismaCreate(
    message: PrivateRevokedMessage
  ): Prisma.MessageUncheckedCreateInput {
    return {
      id: message.id.toString(),
      chatType: 'private',
      chatId: message.chatId.toString(),
      waChatId: message.waChatId.toString(),
      waMessageId: message.waMessageId.toString(),
      instanceId: message.instanceId.toString(),
      quotedId: message.quoted?.id.toString(),
      senderId: message.sentBy?.toString(),
      type: message.type,
      status: message.status,
      isForwarded: message.isForwarded,
      isFromMe: message.isFromMe,
      createdAt: message.createdAt,
      revokerId: message.revokedBy?.toString(),
      revokedAt: message.revokedAt,
    }
  }

  static toPrismaSetStatus(
    message: PrivateRevokedMessage
  ): Prisma.MessageUncheckedUpdateInput {
    return {
      status: message.status,
    }
  }

  static toPrismaSetRevoked(
    message: PrivateRevokedMessage
  ): Prisma.MessageUncheckedUpdateInput {
    return {
      chatType: 'private',
      chatId: message.chatId.toString(),
      waChatId: message.waChatId.toString(),
      waMessageId: message.waMessageId.toString(),
      instanceId: message.instanceId.toString(),
      senderId: message.sentBy?.toString(),
      type: message.type,
      status: message.status,
      isForwarded: message.isForwarded,
      isFromMe: message.isFromMe,
      createdAt: message.createdAt,
      revokerId: message.revokedBy?.toString(),
      revokedAt: message.revokedAt,
      quotedId: {
        unset: true,
      },
      body: {
        unset: true,
      },
      media: {
        unset: true,
      },
      contactInstanceIds: {
        set: [],
      },
      replies: {
        set: [],
      },
      payload: null,
    }
  }
}
