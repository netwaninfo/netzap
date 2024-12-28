import { Prisma } from '@prisma/client'
import { type SetNonNullable } from 'type-fest'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { GroupImageMessage } from '@/domain/chat/enterprise/entities/group/image-message.js'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id.js'
import { PrismaContactInstanceMapper } from '../prisma-contact-instance-mapper.js'
import { PrismaMessageMediaMapper } from '../prisma-message-media-mapper.js'
import type { RawGroupMessage } from './message-mapper.js'
import { PrismaGroupMessageMapper } from './message-mapper.js'

type Raw = SetNonNullable<RawGroupMessage, 'author'>

export class PrismaGroupImageMessageMapper {
  static toDomain(raw: Raw): GroupImageMessage {
    return GroupImageMessage.create(
      {
        status: raw.status,
        chatId: UniqueEntityID.create(raw.chatId),
        instanceId: UniqueEntityID.create(raw.instanceId),
        waChatId: WAEntityID.createFromString(raw.waChatId),
        waMessageId: WAMessageID.createFromString(raw.waMessageId),
        author: PrismaContactInstanceMapper.toDomain(raw.author),
        body: raw.body,
        isForwarded: raw.isForwarded,
        isFromMe: raw.isFromMe,
        createdAt: raw.createdAt,
        media: raw.media ? PrismaMessageMediaMapper.toDomain(raw.media) : null,
        ...(raw.senderId && { sentBy: UniqueEntityID.create(raw.senderId) }),
        ...(raw.quoted && {
          quoted: PrismaGroupMessageMapper.toDomain(raw.quoted),
        }),
      },
      UniqueEntityID.create(raw.id)
    )
  }

  static toPrismaCreate(
    message: GroupImageMessage
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
      body: message.body,
      media: message.hasMedia()
        ? PrismaMessageMediaMapper.toPrismaCreate(message.media)
        : null,
    }
  }

  static toPrismaSetStatus(
    message: GroupImageMessage
  ): Prisma.MessageUncheckedUpdateInput {
    return {
      status: message.status,
    }
  }
}
