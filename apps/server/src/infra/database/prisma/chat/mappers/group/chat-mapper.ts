import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GroupChat } from '@/domain/chat/enterprise/entities/group/chat'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { Prisma, Chat as PrismaChat } from '@prisma/client'
import { Except } from 'type-fest'
import { PrismaChatMapper } from '../prisma-chat-mapper'
import { PrismaGroupMapper, Raw as RawGroup } from '../prisma-group-mapper'
import { PrismaGroupMessageMapper, RawGroupMessage } from './message-mapper'

export type RawGroupChat = PrismaChat & {
  message?: Except<RawGroupMessage, 'quoted'> | null
  group: RawGroup | null
}

export class PrismaGroupChatMapper {
  static toDomain(raw: RawGroupChat): GroupChat {
    if (!raw.group) {
      throw new Error('Missing group of GroupChat')
    }

    return GroupChat.create(
      {
        group: PrismaGroupMapper.toDomain(raw.group),
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
      recipientId: chat.group.id.toString(),
      type: 'group',
      unreadCount: chat.unreadCount,
      lastMessageId: PrismaChatMapper.getLastMessageIDFromChat(chat),
      hasLastMessage: chat.hasLastMessage(),
    }
  }

  static toPrismaSetUnreadCount(
    chat: GroupChat
  ): Prisma.ChatUncheckedUpdateInput {
    return {
      unreadCount: chat.unreadCount,
    }
  }

  static toPrismaSetMessage(chat: GroupChat): Prisma.ChatUncheckedUpdateInput {
    return {
      lastMessageId: PrismaChatMapper.getLastMessageIDFromChat(chat),
      hasLastMessage: chat.hasLastMessage(),
      lastInteractionAt: chat.lastInteractionAt,
    }
  }
}
