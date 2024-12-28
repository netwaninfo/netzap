import { Prisma } from '@prisma/client'

import { isPrivateMessage } from '@/domain/chat/enterprise/type-guards/message.js'
import type {
  Message,
  RevokedMessage,
} from '@/domain/chat/enterprise/types/message.js'
import {
  PrismaGroupMessageMapper,
  type RawGroupMessage,
} from './group/message-mapper.js'
import {
  PrismaPrivateMessageMapper,
  type RawPrivateMessage,
} from './private/message-mapper.js'

type Raw = RawPrivateMessage | RawGroupMessage

export class PrismaMessageMapper {
  static toDomain(raw: Raw): Message {
    if (PrismaMessageMapper.isRawPrivateMessage(raw)) {
      return PrismaPrivateMessageMapper.toDomain(raw)
    }

    return PrismaGroupMessageMapper.toDomain(raw)
  }

  static toPrismaCreate(message: Message): Prisma.MessageUncheckedCreateInput {
    if (isPrivateMessage(message)) {
      return PrismaPrivateMessageMapper.toPrismaCreate(message)
    }

    return PrismaGroupMessageMapper.toPrismaCreate(message)
  }

  static toPrismaSetStatus(
    message: Message
  ): Prisma.MessageUncheckedUpdateInput {
    if (isPrivateMessage(message)) {
      return PrismaPrivateMessageMapper.toPrismaSetStatus(message)
    }

    return PrismaGroupMessageMapper.toPrismaSetStatus(message)
  }

  static toPrismaSetRevoked(
    message: RevokedMessage
  ): Prisma.MessageUncheckedUpdateInput {
    if (isPrivateMessage(message)) {
      return PrismaPrivateMessageMapper.toPrismaSetRevoked(message)
    }

    return PrismaGroupMessageMapper.toPrismaSetRevoked(message)
  }

  // Type Guards/Asserts
  private static isRawPrivateMessage(raw: Raw): raw is RawPrivateMessage {
    return raw.chatType === 'private'
  }
}
