import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GroupRevokedMessage } from '@/domain/chat/enterprise/entities/group/revoked-message'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id'
import { Prisma } from '@prisma/client'
import { SetNonNullable } from 'type-fest'
import { PrismaContactInstanceMapper } from '../prisma-contact-instance-mapper'
import { RawGroupMessage } from './message-mapper'

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

  static toPrismaUpdate(
    message: GroupRevokedMessage
  ): Prisma.MessageUncheckedUpdateInput {
    return {
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
}
