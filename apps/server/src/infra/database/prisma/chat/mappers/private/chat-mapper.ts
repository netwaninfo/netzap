import type { Prisma, Chat as PrismaChat } from '@prisma/client'
import type { Except } from 'type-fest'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat.js'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import { PrismaChatMapper } from '../prisma-chat-mapper.js'
import {
  PrismaContactInstanceMapper,
  type Raw as RawContactInstance,
} from '../prisma-contact-instance-mapper.js'
import {
  PrismaPrivateMessageMapper,
  type RawPrivateMessage,
} from './message-mapper.js'

export type RawPrivateChat = PrismaChat & {
  message?: Except<RawPrivateMessage, 'quoted'> | null
  contact: RawContactInstance | null
}

export class PrismaPrivateChatMapper {
  static toDomain(raw: RawPrivateChat): PrivateChat {
    if (!raw.contact) {
      throw new Error('Missing contact of PrivateChat')
    }

    return PrivateChat.create(
      {
        contact: PrismaContactInstanceMapper.toDomain(raw.contact),
        instanceId: UniqueEntityID.create(raw.instanceId),
        unreadCount: raw.unreadCount,
        waChatId: WAEntityID.createFromString(raw.waChatId),
        ...(raw.message && {
          lastMessage: PrismaPrivateMessageMapper.toDomain(raw.message),
        }),
        lastInteractionAt: raw.lastInteractionAt,
      },
      UniqueEntityID.create(raw.id)
    )
  }

  static toPrismaCreate(chat: PrivateChat): Prisma.ChatUncheckedCreateInput {
    return {
      id: chat.id.toString(),
      instanceId: chat.instanceId.toString(),
      waChatId: chat.waChatId.toString(),
      recipientId: chat.contact.id.toString(),
      type: 'private',
      unreadCount: chat.unreadCount,
      lastMessageId: PrismaChatMapper.getLastMessageIDFromChat(chat),
      hasLastMessage: chat.hasLastMessage(),
      lastInteractionAt: chat.lastInteractionAt,
    }
  }

  static toPrismaSetUnreadCount(
    chat: PrivateChat
  ): Prisma.ChatUncheckedUpdateInput {
    return {
      unreadCount: chat.unreadCount,
    }
  }

  static toPrismaSetMessage(
    chat: PrivateChat
  ): Prisma.ChatUncheckedUpdateInput {
    return {
      lastMessageId: PrismaChatMapper.getLastMessageIDFromChat(chat),
      hasLastMessage: chat.hasLastMessage(),
      lastInteractionAt: chat.lastInteractionAt,
    }
  }
}
