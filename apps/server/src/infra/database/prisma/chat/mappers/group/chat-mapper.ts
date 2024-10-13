import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GroupChat } from '@/domain/chat/enterprise/entities/group/chat'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { Prisma, Chat as PrismaChat } from '@prisma/client'
import { Except } from 'type-fest'
import { PrismaChatMapper } from '../prisma-chat-mapper'
import { PrismaGroupMessageMapper, RawGroupMessage } from './message-mapper'

export type RawGroupChat = PrismaChat & {
  message?: Except<RawGroupMessage, 'quoted'> | null
}

export class PrismaGroupChatMapper {
  static toDomain(raw: RawGroupChat): GroupChat {
    return GroupChat.create(
      {
        groupId: UniqueEntityID.create(raw.recipientId),
        instanceId: UniqueEntityID.create(raw.instanceId),
        unreadCount: raw.unreadCount,
        waChatId: WAEntityID.createFromString(raw.waChatId),
        ...(raw.message && {
          lastMessage: PrismaGroupMessageMapper.toDomain(raw.message),
        }),
      },
      UniqueEntityID.create(raw.id)
    )
  }

  static toPrismaCreate(chat: GroupChat): Prisma.ChatUncheckedCreateInput {
    return {
      id: chat.id.toString(),
      instanceId: chat.instanceId.toString(),
      waChatId: chat.waChatId.toString(),
      recipientId: chat.groupId.toString(),
      type: 'group',
      unreadCount: chat.unreadCount,
      lastMessageId: PrismaChatMapper.getLastMessageIDFromChat(chat),
      hasLastMessage: chat.hasLastMessage(),
    }
  }

  static toPrismaUpdate(chat: GroupChat): Prisma.ChatUncheckedUpdateInput {
    return {
      instanceId: chat.instanceId.toString(),
      waChatId: chat.waChatId.toString(),
      recipientId: chat.groupId.toString(),
      type: 'group',
      unreadCount: chat.unreadCount,
      lastMessageId: PrismaChatMapper.getLastMessageIDFromChat(chat),
      hasLastMessage: chat.hasLastMessage(),
    }
  }
}
