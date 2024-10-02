import {
  ChatsRepository,
  ChatsRepositoryCountByInstanceIdParams,
  ChatsRepositoryFindManyPaginatedByInstanceIdParams,
  ChatsRepositoryFindUniqueByWAChatIdAndInstanceIdParams,
  ChatsRepositoryFindUniqueGroupChatByWAChatIdAndInstanceIdParams,
  ChatsRepositoryFindUniquePrivateChatByWAChatIdAndInstanceIdParams,
} from '@/domain/chat/application/repositories/chats-repository'
import { GroupChat } from '@/domain/chat/enterprise/entities/group/chat'
import { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat'
import { Chat } from '@/domain/chat/enterprise/types/chat'
import { Pagination } from '@/domain/shared/entities/pagination'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma.service'
import { PrismaGroupChatMapper } from '../mappers/group/chat-mapper'
import { PrismaChatMapper } from '../mappers/prisma-chat-mapper'
import { PrismaPrivateChatMapper } from '../mappers/private/chat-mapper'

const CHAT_INCLUDES = {
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
} satisfies Prisma.ChatInclude

@Injectable()
export class PrismaChatsRepository implements ChatsRepository {
  constructor(private prisma: PrismaService) {}

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
      },
      include: CHAT_INCLUDES,
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
      },
      include: CHAT_INCLUDES,
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
      },
      include: CHAT_INCLUDES,
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
      },
      take,
      skip: Pagination.skip({ limit: take, page }),
      include: CHAT_INCLUDES,
    })

    return raw.map(PrismaChatMapper.toDomain)
  }

  async countByInstanceId({
    instanceId,
  }: ChatsRepositoryCountByInstanceIdParams): Promise<number> {
    const rows = await this.prisma.chat.count({
      where: {
        instanceId: instanceId.toString(),
      },
    })

    return rows
  }

  async create(chat: Chat): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.chat.create({
        data: PrismaChatMapper.toPrismaCreate(chat),
      }),
    ])
  }

  async save(chat: Chat): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.chat.update({
        data: PrismaChatMapper.toPrismaUpdate(chat),
        where: {
          id: chat.id.toString(),
        },
      }),
    ])
  }
}
