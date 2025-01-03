import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import type {
  ChatsRepository,
  ChatsRepositoryCountByInstanceIdParams,
  ChatsRepositoryFindManyPaginatedByInstanceIdParams,
  ChatsRepositoryFindUniqueByWAChatIdAndInstanceIdParams,
  ChatsRepositoryFindUniqueGroupChatByWAChatIdAndInstanceIdParams,
  ChatsRepositoryFindUniquePrivateChatByWAChatIdAndInstanceIdParams,
} from '@/domain/chat/application/repositories/chats-repository.js'
import { GroupChat } from '@/domain/chat/enterprise/entities/group/chat.js'
import { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat.js'
import type { Chat } from '@/domain/chat/enterprise/types/chat.js'
import { Pagination } from '@/domain/shared/entities/pagination.js'
import { PrismaService } from '../../prisma.service.js'
import { PrismaGroupChatMapper } from '../mappers/group/chat-mapper.js'
import { PrismaChatMapper } from '../mappers/prisma-chat-mapper.js'
import { PrismaPrivateChatMapper } from '../mappers/private/chat-mapper.js'

@Injectable()
export class PrismaChatsRepository implements ChatsRepository {
  constructor(private prisma: PrismaService) {}

  private getChatIncludes() {
    return {
      message: {
        include: {
          author: {
            include: {
              contact: true,
            },
          },
          contacts: {
            include: {
              contact: true,
            },
          },
        },
      },
      contact: {
        include: {
          contact: true,
        },
      },
      group: true,
    } satisfies Prisma.ChatInclude
  }

  async findUniqueByWAChatIdAndInstanceId({
    instanceId,
    waChatId,
  }: ChatsRepositoryFindUniqueByWAChatIdAndInstanceIdParams): Promise<Chat | null> {
    const raw = await this.prisma.chat.findUnique({
      where: {
        instanceId_waChatId: {
          instanceId: instanceId.toString(),
          waChatId: waChatId.toString(),
        },
        ...(waChatId.node === 'c.us' && {
          contact: {
            isNot: null,
          },
        }),
        ...(waChatId.node === 'g.us' && {
          group: {
            isNot: null,
          },
        }),
      },
      include: this.getChatIncludes(),
    })

    if (!raw) return null

    return PrismaChatMapper.toDomain(raw)
  }

  async findUniquePrivateChatByWAChatIdAndInstanceId({
    instanceId,
    waChatId,
  }: ChatsRepositoryFindUniquePrivateChatByWAChatIdAndInstanceIdParams): Promise<PrivateChat | null> {
    const raw = await this.prisma.chat.findUnique({
      where: {
        type: 'private',
        instanceId_waChatId: {
          instanceId: instanceId.toString(),
          waChatId: waChatId.toString(),
        },
        contact: {
          isNot: null,
        },
      },
      include: this.getChatIncludes(),
    })

    if (!raw) return null

    return PrismaPrivateChatMapper.toDomain(raw)
  }

  async findUniqueGroupChatByWAChatIdAndInstanceId({
    instanceId,
    waChatId,
  }: ChatsRepositoryFindUniqueGroupChatByWAChatIdAndInstanceIdParams): Promise<GroupChat | null> {
    const raw = await this.prisma.chat.findUnique({
      where: {
        type: 'group',
        instanceId_waChatId: {
          instanceId: instanceId.toString(),
          waChatId: waChatId.toString(),
        },
        group: {
          isNot: null,
        },
      },
      include: this.getChatIncludes(),
    })

    if (!raw) return null

    return PrismaGroupChatMapper.toDomain(raw)
  }

  async findManyPaginatedByInstanceId({
    instanceId,
    page,
    take,
  }: ChatsRepositoryFindManyPaginatedByInstanceIdParams): Promise<Chat[]> {
    const raw = await this.prisma.chat.findMany({
      where: {
        instanceId: instanceId.toString(),
        OR: [{ hasLastMessage: true }, { lastInteractionAt: { not: null } }],
      },
      take,
      skip: Pagination.skip({ limit: take, page }),
      include: this.getChatIncludes(),
      orderBy: [
        { message: { createdAt: 'desc' } },
        { lastInteractionAt: 'desc' },
      ],
    })

    return raw.map(PrismaChatMapper.toDomain)
  }

  async countByInstanceId({
    instanceId,
  }: ChatsRepositoryCountByInstanceIdParams): Promise<number> {
    const rows = await this.prisma.chat.count({
      where: {
        instanceId: instanceId.toString(),
        OR: [{ hasLastMessage: true }, { lastInteractionAt: { not: null } }],
      },
    })

    return rows
  }

  async create(chat: Chat): Promise<void> {
    try {
      await this.prisma.$transaction([
        this.prisma.chat.create({
          data: PrismaChatMapper.toPrismaCreate(chat),
        }),
      ])
    } catch (error) {}
  }

  async setMessage(chat: Chat): Promise<void> {
    try {
      await this.prisma.$transaction([
        this.prisma.chat.update({
          data: PrismaChatMapper.toPrismaSetMessage(chat),
          where: {
            id: chat.id.toString(),
          },
        }),
      ])
    } catch (error) {}
  }

  async setUnreadCount(chat: Chat): Promise<void> {
    try {
      await this.prisma.$transaction([
        this.prisma.chat.update({
          data: PrismaChatMapper.toPrismaSetUnreadCount(chat),
          where: {
            id: chat.id.toString(),
          },
        }),
      ])
    } catch (error) {}
  }
}
