import type {
  MessagesRepository,
  MessagesRepositoryCountByInstanceIdAndWAChatIdParams,
  MessagesRepositoryFindManyPaginatedByInstanceIdAndWAChatIdParams,
  MessagesRepositoryFindUniqueByCreatedAtAndInstanceIdAndWAChatIdParams,
  MessagesRepositoryFindUniqueByWAMessageIdAndInstanceIdParams,
  MessagesRepositoryFindUniqueGroupMessageByChatIAndWAMessageIdParams,
  MessagesRepositoryFindUniquePrivateMessageByChatIAndWAMessageIdParams,
} from '@/domain/chat/application/repositories/messages-repository.js'
import { GroupRevokedMessage } from '@/domain/chat/enterprise/entities/group/revoked-message.js'
import { PrivateRevokedMessage } from '@/domain/chat/enterprise/entities/private/revoked-message.js'
import {
  isGroupMessage,
  isPrivateMessage,
} from '@/domain/chat/enterprise/type-guards/message.js'
import type {
  GroupMessage,
  Message,
  PrivateMessage,
} from '@/domain/chat/enterprise/types/message.js'
import { Pagination } from '@/domain/shared/entities/pagination.js'
import { dayjs } from '@/test/lib/dayjs.js'

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

  async setStatus(message: Message): Promise<void> {
    const itemIndex = this.items.findIndex(
      item => item.id.toString() === message.id.toString()
    )

    const item = this.items[itemIndex]
    if (!item) return

    item.setStatus(message.status)
  }

  async setRevoked(
    message: PrivateRevokedMessage | GroupRevokedMessage
  ): Promise<void> {
    const itemIndex = this.items.findIndex(
      item => item.id.toString() === message.id.toString()
    )

    this.items[itemIndex] = message
  }
}
