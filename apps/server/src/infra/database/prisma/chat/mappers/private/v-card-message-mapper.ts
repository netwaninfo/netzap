import type { Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { PrivateVCardMessage } from '@/domain/chat/enterprise/entities/private/v-card-message.js'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id.js'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format.js'
import {
  PrismaContactInstanceMapper,
  type Raw as RawContactInstance,
} from '../prisma-contact-instance-mapper.js'
import type { RawPrivateMessage } from './message-mapper.js'
import { PrismaPrivateMessageMapper } from './message-mapper.js'

type Raw = RawPrivateMessage & {
  contacts: RawContactInstance[]
}

export class PrismaPrivateVCardMessageMapper {
  static toDomain(raw: Raw): PrivateVCardMessage {
    const contactInstance = raw.contacts[0]

    if (!contactInstance) {
      throw new InvalidResourceFormatError({ id: raw.id })
    }

    return PrivateVCardMessage.create(
      {
        status: raw.status,
        chatId: UniqueEntityID.create(raw.chatId),
        instanceId: UniqueEntityID.create(raw.instanceId),
        waChatId: WAEntityID.createFromString(raw.waChatId),
        waMessageId: WAMessageID.createFromString(raw.waMessageId),
        isForwarded: raw.isForwarded,
        isFromMe: raw.isFromMe,
        createdAt: raw.createdAt,
        ...(raw.senderId && { sentBy: UniqueEntityID.create(raw.senderId) }),
        contact: PrismaContactInstanceMapper.toDomain(contactInstance),
        ...(raw.quoted && {
          quoted: PrismaPrivateMessageMapper.toDomain(raw.quoted),
        }),
      },
      UniqueEntityID.create(raw.id)
    )
  }

  static toPrismaCreate(
    message: PrivateVCardMessage
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
      contacts: {
        connect: {
          id: message.contact.id.toString(),
          instanceId: message.instanceId.toString(),
        },
      },
    }
  }

  static toPrismaSetStatus(
    message: PrivateVCardMessage
  ): Prisma.MessageUncheckedUpdateInput {
    return {
      status: message.status,
    }
  }
}
