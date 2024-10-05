import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { Prisma, Chat as PrismaChat } from '@prisma/client'
import { Except } from 'type-fest'
import { PrismaPrivateMessageMapper, RawPrivateMessage } from './message-mapper'

export type RawPrivateChat = PrismaChat & {
  message?: Except<RawPrivateMessage, 'quoted'> | null
}

export class PrismaPrivateChatMapper {
  static toDomain(raw: RawPrivateChat): PrivateChat {
    return PrivateChat.create(
      {
        contactId: UniqueEntityID.create(raw.recipientId),
        instanceId: UniqueEntityID.create(raw.instanceId),
        unreadCount: raw.unreadCount,
        waChatId: WAEntityID.createFromString(raw.waChatId),
        ...(raw.message && {
          lastMessage: PrismaPrivateMessageMapper.toDomain(raw.message),
        }),
      },
      UniqueEntityID.create(raw.id)
    )
  }

  static toPrismaCreate(chat: PrivateChat): Prisma.ChatUncheckedCreateInput {
    return {
      id: chat.id.toString(),
      instanceId: chat.instanceId.toString(),
      waChatId: chat.waChatId.toString(),
      recipientId: chat.contactId.toString(),
      type: 'private',
      unreadCount: chat.unreadCount,
      lastMessageId: chat.lastMessage?.id.toString(),
    }
  }

  static toPrismaUpdate(chat: PrivateChat): Prisma.ChatUncheckedUpdateInput {
    return {
      instanceId: chat.instanceId.toString(),
      waChatId: chat.waChatId.toString(),
      recipientId: chat.contactId.toString(),
      type: 'private',
      unreadCount: chat.unreadCount,
      lastMessageId: chat.lastMessage?.id.toString(),
    }
  }
}
