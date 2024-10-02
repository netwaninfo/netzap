import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrivateVCardMessage } from '@/domain/chat/enterprise/entities/private/v-card-message'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { Prisma } from '@prisma/client'
import {
  PrismaContactInstanceMapper,
  Raw as RawContactInstance,
} from '../prisma-contact-instance-mapper'
import { RawPrivateMessage } from './message-mapper'
import { PrismaPrivateMessageMapper } from './message-mapper'

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
          contactId_instanceId: {
            contactId: message.contact.id.toString(),
            instanceId: message.instanceId.toString(),
          },
        },
      },
    }
  }

  static toPrismaUpdate(
    message: PrivateVCardMessage
  ): Prisma.MessageUncheckedUpdateInput {
    return {
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
          contactId_instanceId: {
            contactId: message.contact.id.toString(),
            instanceId: message.instanceId.toString(),
          },
        },
      },
    }
  }
}
