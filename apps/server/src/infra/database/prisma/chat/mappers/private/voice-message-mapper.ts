import type { Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { PrivateVoiceMessage } from '@/domain/chat/enterprise/entities/private/voice-message.js'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id.js'
import { PrismaMessageMediaMapper } from '../prisma-message-media-mapper.js'
import type { RawPrivateMessage } from './message-mapper.js'
import { PrismaPrivateMessageMapper } from './message-mapper.js'

type Raw = RawPrivateMessage

export class PrismaPrivateVoiceMessageMapper {
  static toDomain(raw: Raw): PrivateVoiceMessage {
    return PrivateVoiceMessage.create(
      {
        status: raw.status,
        chatId: UniqueEntityID.create(raw.chatId),
        instanceId: UniqueEntityID.create(raw.instanceId),
        waChatId: WAEntityID.createFromString(raw.waChatId),
        waMessageId: WAMessageID.createFromString(raw.waMessageId),
        isForwarded: raw.isForwarded,
        isFromMe: raw.isFromMe,
        createdAt: raw.createdAt,
        media: raw.media ? PrismaMessageMediaMapper.toDomain(raw.media) : null,
        ...(raw.senderId && { sentBy: UniqueEntityID.create(raw.senderId) }),
        ...(raw.quoted && {
          quoted: PrismaPrivateMessageMapper.toDomain(raw.quoted),
        }),
      },
      UniqueEntityID.create(raw.id)
    )
  }

  static toPrismaCreate(
    message: PrivateVoiceMessage
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
      media: message.hasMedia()
        ? PrismaMessageMediaMapper.toPrismaCreate(message.media)
        : null,
    }
  }

  static toPrismaSetStatus(
    message: PrivateVoiceMessage
  ): Prisma.MessageUncheckedUpdateInput {
    return {
      status: message.status,
    }
  }
}
