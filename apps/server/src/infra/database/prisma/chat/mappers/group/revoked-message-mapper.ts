import { Prisma } from '@prisma/client'
import type { SetNonNullable } from 'type-fest'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { GroupRevokedMessage } from '@/domain/chat/enterprise/entities/group/revoked-message.js'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id.js'
import { PrismaContactInstanceMapper } from '../prisma-contact-instance-mapper.js'
import type { RawGroupMessage } from './message-mapper.js'

type Raw = SetNonNullable<RawGroupMessage, 'author'>

export class PrismaGroupRevokedMessageMapper {
  static toDomain(raw: Raw): GroupRevokedMessage {
    return GroupRevokedMessage.create(
      {
        status: raw.status,
        chatId: UniqueEntityID.create(raw.chatId),
        instanceId: UniqueEntityID.create(raw.instanceId),
        waChatId: WAEntityID.createFromString(raw.waChatId),
        waMessageId: WAMessageID.createFromString(raw.waMessageId),
        author: PrismaContactInstanceMapper.toDomain(raw.author),
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
    message: GroupRevokedMessage
  ): Prisma.MessageUncheckedCreateInput {
    return {
      id: message.id.toString(),
      chatType: 'group',
      authorId: message.author.id.toString(),
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
    message: GroupRevokedMessage
  ): Prisma.MessageUncheckedUpdateInput {
    return {
      status: message.status,
    }
  }

  static toPrismaSetRevoked(
    message: GroupRevokedMessage
  ): Prisma.MessageUncheckedUpdateInput {
    return {
      chatType: 'group',
      authorId: message.author.id.toString(),
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
