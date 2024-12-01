import {
  MessagesRepository,
  MessagesRepositoryCountByInstanceIdAndWAChatIdParams,
  MessagesRepositoryFindManyPaginatedByInstanceIdAndWAChatIdParams,
  MessagesRepositoryFindUniqueByCreatedAtAndInstanceIdAndWAChatIdParams,
  MessagesRepositoryFindUniqueByWAMessageIdAndInstanceIdParams,
  MessagesRepositoryFindUniqueGroupMessageByChatIAndWAMessageIdParams,
  MessagesRepositoryFindUniquePrivateMessageByChatIAndWAMessageIdParams,
} from '@/domain/chat/application/repositories/messages-repository'
import {
  GroupMessage,
  Message,
  PrivateMessage,
  RevokedMessage,
} from '@/domain/chat/enterprise/types/message'
import { Pagination } from '@/domain/shared/entities/pagination'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma.service'
import { PrismaGroupMessageMapper } from '../mappers/group/message-mapper'
import { PrismaMessageMapper } from '../mappers/prisma-message-mapper'
import { PrismaPrivateMessageMapper } from '../mappers/private/message-mapper'

@Injectable()
export class PrismaMessagesRepository implements MessagesRepository {
  constructor(private prisma: PrismaService) {}

  private getMessagesIncludes() {
    return {
      contacts: {
        include: {
          contact: true,
        },
      },
      quoted: {
        include: {
          contacts: {
            include: {
              contact: true,
            },
          },
          author: {
            include: {
              contact: true,
            },
          },
        },
      },
      author: {
        include: {
          contact: true,
        },
      },
    } satisfies Prisma.MessageInclude
  }

  async findUniquePrivateMessageByChatIAndWAMessageId({
    chatId,
    waMessageId,
  }: MessagesRepositoryFindUniquePrivateMessageByChatIAndWAMessageIdParams): Promise<PrivateMessage | null> {
    const raw = await this.prisma.message.findUnique({
      where: {
        chatType: 'private',
        chatId_waMessageId: {
          chatId: chatId.toString(),
          waMessageId: waMessageId.toString(),
        },
      },
      include: this.getMessagesIncludes(),
    })

    if (!raw) return null

    return PrismaPrivateMessageMapper.toDomain(raw)
  }

  async findUniqueGroupMessageByChatIAndWAMessageId({
    chatId,
    waMessageId,
  }: MessagesRepositoryFindUniqueGroupMessageByChatIAndWAMessageIdParams): Promise<GroupMessage | null> {
    const raw = await this.prisma.message.findUnique({
      where: {
        chatType: 'group',
        chatId_waMessageId: {
          chatId: chatId.toString(),
          waMessageId: waMessageId.toString(),
        },
      },
      include: this.getMessagesIncludes(),
    })

    if (!raw) return null

    return PrismaGroupMessageMapper.toDomain(raw)
  }

  async findUniqueByWAMessageIdAndInstanceId({
    instanceId,
    waMessageId,
  }: MessagesRepositoryFindUniqueByWAMessageIdAndInstanceIdParams): Promise<Message | null> {
    const raw = await this.prisma.message.findUnique({
      where: {
        instanceId_waMessageId: {
          instanceId: instanceId.toString(),
          waMessageId: waMessageId.toString(),
        },
      },
      include: this.getMessagesIncludes(),
    })

    if (!raw) return null

    return PrismaMessageMapper.toDomain(raw)
  }

  async findUniqueByCreatedAtAndInstanceIdAndWAChatId({
    createdAt,
    instanceId,
    waChatId,
  }: MessagesRepositoryFindUniqueByCreatedAtAndInstanceIdAndWAChatIdParams): Promise<Message | null> {
    const raw = await this.prisma.message.findFirst({
      where: {
        waChatId: waChatId.toString(),
        createdAt: createdAt.toISOString(),
        instanceId: instanceId.toString(),
      },
      include: this.getMessagesIncludes(),
    })

    if (!raw) return null

    return PrismaMessageMapper.toDomain(raw)
  }

  async findManyPaginatedByInstanceIdAndWAChatId({
    instanceId,
    page,
    take,
    waChatId,
  }: MessagesRepositoryFindManyPaginatedByInstanceIdAndWAChatIdParams): Promise<
    Message[]
  > {
    const raw = await this.prisma.message.findMany({
      where: {
        waChatId: waChatId.toString(),
        instanceId: instanceId.toString(),
      },
      take,
      skip: Pagination.skip({ limit: take, page }),
      include: this.getMessagesIncludes(),
      orderBy: {
        createdAt: 'desc',
      },
    })

    return raw.map(PrismaMessageMapper.toDomain)
  }

  async countByInstanceIdAndWAChatId({
    instanceId,
    waChatId,
  }: MessagesRepositoryCountByInstanceIdAndWAChatIdParams): Promise<number> {
    const rows = await this.prisma.message.count({
      where: {
        waChatId: waChatId.toString(),
        instanceId: instanceId.toString(),
      },
    })

    return rows
  }

  async create(message: Message): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.message.create({
        data: PrismaMessageMapper.toPrismaCreate(message),
      }),
    ])
  }

  async setStatus(message: Message): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.message.update({
        data: PrismaMessageMapper.toPrismaSetStatus(message),
        where: {
          id: message.id.toString(),
        },
      }),
    ])
  }

  async setRevoked(message: RevokedMessage): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.message.update({
        data: PrismaMessageMapper.toPrismaSetRevoked(message),
        where: {
          id: message.id.toString(),
        },
      }),
    ])
  }
}
