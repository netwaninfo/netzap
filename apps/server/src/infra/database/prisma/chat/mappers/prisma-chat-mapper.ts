import { Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { isPrivateChat } from '@/domain/chat/enterprise/type-guards/chat.js'
import type { Chat } from '@/domain/chat/enterprise/types/chat.js'
import {
  PrismaGroupChatMapper,
  type RawGroupChat,
} from './group/chat-mapper.js'
import {
  PrismaPrivateChatMapper,
  type RawPrivateChat,
} from './private/chat-mapper.js'

type Raw = RawPrivateChat | RawGroupChat

export class PrismaChatMapper {
  static getLastMessageIDFromChat(chat: Chat) {
    // Generating an ID to avoid a constraint error when no last message exists
    return chat.hasLastMessage()
      ? chat.lastMessage.id.toString()
      : UniqueEntityID.create().toString()
  }

  static toDomain(raw: Raw): Chat {
    if (PrismaChatMapper.isRawPrivateChat(raw)) {
      return PrismaPrivateChatMapper.toDomain(raw)
    }

    return PrismaGroupChatMapper.toDomain(raw)
  }

  static toPrismaCreate(chat: Chat): Prisma.ChatUncheckedCreateInput {
    if (isPrivateChat(chat)) {
      return PrismaPrivateChatMapper.toPrismaCreate(chat)
    }

    return PrismaGroupChatMapper.toPrismaCreate(chat)
  }

  static toPrismaSetUnreadCount(chat: Chat): Prisma.ChatUncheckedUpdateInput {
    if (isPrivateChat(chat)) {
      return PrismaPrivateChatMapper.toPrismaSetUnreadCount(chat)
    }

    return PrismaGroupChatMapper.toPrismaSetUnreadCount(chat)
  }

  static toPrismaSetMessage(chat: Chat): Prisma.ChatUncheckedUpdateInput {
    if (isPrivateChat(chat)) {
      return PrismaPrivateChatMapper.toPrismaSetMessage(chat)
    }

    return PrismaGroupChatMapper.toPrismaSetMessage(chat)
  }

  // Type Guards/Asserts
  private static isRawPrivateChat(raw: Raw): raw is RawPrivateChat {
    return raw.type === 'private'
  }
}
