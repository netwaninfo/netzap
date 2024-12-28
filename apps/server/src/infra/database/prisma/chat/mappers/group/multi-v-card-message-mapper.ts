import { Prisma } from '@prisma/client'
import type { SetNonNullable } from 'type-fest'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { GroupMultiVCardMessage } from '@/domain/chat/enterprise/entities/group/multi-v-card-message.js'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id.js'
import {
  PrismaContactInstanceMapper,
  type Raw as RawContactInstance,
} from '../prisma-contact-instance-mapper.js'
import type { RawGroupMessage } from './message-mapper.js'
import { PrismaGroupMessageMapper } from './message-mapper.js'

type Raw = SetNonNullable<RawGroupMessage, 'author'> & {
  contacts: RawContactInstance[]
}

export class PrismaGroupMultiVCardMessageMapper {
  static toDomain(raw: Raw): GroupMultiVCardMessage {
    return GroupMultiVCardMessage.create(
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
        contacts: raw.contacts.map(PrismaContactInstanceMapper.toDomain),
        ...(raw.senderId && { sentBy: UniqueEntityID.create(raw.senderId) }),
        ...(raw.quoted && {
          quoted: PrismaGroupMessageMapper.toDomain(raw.quoted),
        }),
      },
      UniqueEntityID.create(raw.id)
    )
  }

  static toPrismaCreate(
    message: GroupMultiVCardMessage
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
      ...(message.hasContacts() && {
        contacts: {
          connect: message.contacts.map(contact => ({
            id: contact.id.toString(),
            instanceId: message.instanceId.toString(),
          })),
        },
      }),
    }
  }

  static toPrismaSetStatus(
    message: GroupMultiVCardMessage
  ): Prisma.MessageUncheckedUpdateInput {
    return {
      status: message.status,
    }
  }
}
