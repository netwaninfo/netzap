import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GroupVCardMessage } from '@/domain/chat/enterprise/entities/group/v-card-message'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { Prisma } from '@prisma/client'
import { SetNonNullable } from 'type-fest'
import {
  PrismaContactInstanceMapper,
  Raw as RawContactInstance,
} from '../prisma-contact-instance-mapper'
import { RawGroupMessage } from './message-mapper'
import { PrismaGroupMessageMapper } from './message-mapper'

type Raw = SetNonNullable<RawGroupMessage, 'author'> & {
  contacts: RawContactInstance[]
}

export class PrismaGroupVCardMessageMapper {
  static toDomain(raw: Raw): GroupVCardMessage {
    const contactInstance = raw.contacts[0]

    if (!contactInstance) {
      throw new InvalidResourceFormatError({ id: raw.id })
    }

    return GroupVCardMessage.create(
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
        contact: PrismaContactInstanceMapper.toDomain(contactInstance),
        ...(raw.senderId && { sentBy: UniqueEntityID.create(raw.senderId) }),
        ...(raw.quoted && {
          quoted: PrismaGroupMessageMapper.toDomain(raw.quoted),
        }),
      },
      UniqueEntityID.create(raw.id)
    )
  }

  static toPrismaCreate(
    message: GroupVCardMessage
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
    message: GroupVCardMessage
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
