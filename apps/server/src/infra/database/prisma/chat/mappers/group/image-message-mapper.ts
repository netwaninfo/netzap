import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GroupImageMessage } from '@/domain/chat/enterprise/entities/group/image-message'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id'
import { Prisma } from '@prisma/client'
import { SetNonNullable } from 'type-fest'
import { PrismaContactInstanceMapper } from '../prisma-contact-instance-mapper'
import { PrismaMessageMediaMapper } from '../prisma-message-media-mapper'
import { RawGroupMessage } from './message-mapper'
import { PrismaGroupMessageMapper } from './message-mapper'

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

  static toPrismaUpdate(
    message: GroupImageMessage
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
      body: message.body,
      media: message.hasMedia()
        ? PrismaMessageMediaMapper.toPrismaCreate(message.media)
        : null,
    }
  }
}
