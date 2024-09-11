import type {
  MessagesRepository,
  MessagesRepositoryCountByInstanceIdAndWAChatIdParams,
  MessagesRepositoryFindManyPaginatedByInstanceIdAndWAChatIdParams,
  MessagesRepositoryFindUniqueByCreatedAtAndInstanceIdAndWAChatIdParams,
  MessagesRepositoryFindUniqueByWAMessageIdAndInstanceIdParams,
  MessagesRepositoryFindUniqueGroupMessageByChatIAndWAMessageIdParams,
  MessagesRepositoryFindUniquePrivateMessageByChatIAndWAMessageIdParams,
} from '@/domain/chat/application/repositories/messages-repository'
import {
  isGroupMessage,
  isPrivateMessage,
} from '@/domain/chat/enterprise/type-guards/message'
import type {
  GroupMessage,
  Message,
  PrivateMessage,
} from '@/domain/chat/enterprise/types/message'
import { Pagination } from '@/domain/shared/entities/pagination'
import dayjs from 'dayjs'

export class InMemoryMessagesRepository implements MessagesRepository {
  items: Message[] = []

  async findUniquePrivateMessageByChatIAndWAMessageId({
    chatId,
    waMessageId,
  }: MessagesRepositoryFindUniquePrivateMessageByChatIAndWAMessageIdParams): Promise<PrivateMessage | null> {
    const message = this.items.find(
      (item): item is PrivateMessage =>
        item.chatId.equals(chatId) &&
        item.waMessageId.equals(waMessageId) &&
        isPrivateMessage(item)
    )

    return message ?? null
  }

  async findUniqueGroupMessageByChatIAndWAMessageId({
    chatId,
    waMessageId,
  }: MessagesRepositoryFindUniqueGroupMessageByChatIAndWAMessageIdParams): Promise<GroupMessage | null> {
    const message = this.items.find(
      (item): item is GroupMessage =>
        item.chatId.equals(chatId) &&
        item.waMessageId.equals(waMessageId) &&
        isGroupMessage(item)
    )

    return message ?? null
  }

  async findUniqueByWAMessageIdAndInstanceId({
    instanceId,
    waMessageId,
  }: MessagesRepositoryFindUniqueByWAMessageIdAndInstanceIdParams): Promise<Message | null> {
    const message = this.items.find(
      (item): item is GroupMessage =>
        item.instanceId.equals(instanceId) &&
        item.waMessageId.equals(waMessageId)
    )

    return message ?? null
  }

  async findUniqueByCreatedAtAndInstanceIdAndWAChatId({
    createdAt,
    instanceId,
    waChatId,
  }: MessagesRepositoryFindUniqueByCreatedAtAndInstanceIdAndWAChatIdParams): Promise<Message | null> {
    const message = this.items.find(
      (item): item is GroupMessage =>
        item.instanceId.equals(instanceId) &&
        item.waChatId.equals(waChatId) &&
        dayjs(item.createdAt).isSame(createdAt, 'seconds')
    )

    return message ?? null
  }

  async findManyPaginatedByInstanceIdAndWAChatId({
    instanceId,
    page,
    take,
    waChatId,
  }: MessagesRepositoryFindManyPaginatedByInstanceIdAndWAChatIdParams): Promise<
    Message[]
  > {
    return this.items
      .filter(
        item =>
          item.instanceId.equals(instanceId) && item.waChatId.equals(waChatId)
      )
      .slice(Pagination.skip({ limit: take, page }), page * take)
  }

  async countByInstanceIdAndWAChatId({
    instanceId,
    waChatId,
  }: MessagesRepositoryCountByInstanceIdAndWAChatIdParams): Promise<number> {
    return this.items.filter(
      item =>
        item.instanceId.equals(instanceId) && item.waChatId.equals(waChatId)
    ).length
  }

  async create(message: Message): Promise<void> {
    this.items.push(message)
  }

  async save(message: Message): Promise<void> {
    const itemIndex = this.items.findIndex(
      item => item.id.toString() === message.id.toString()
    )

    this.items[itemIndex] = message
  }
}
