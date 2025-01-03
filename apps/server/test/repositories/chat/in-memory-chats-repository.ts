import type {
  ChatsRepository,
  ChatsRepositoryCountByInstanceIdParams,
  ChatsRepositoryFindManyPaginatedByInstanceIdParams,
  ChatsRepositoryFindUniqueByWAChatIdAndInstanceIdParams,
  ChatsRepositoryFindUniqueGroupChatByWAChatIdAndInstanceIdParams,
  ChatsRepositoryFindUniquePrivateChatByWAChatIdAndInstanceIdParams,
} from '@/domain/chat/application/repositories/chats-repository.js'
import type { GroupChat } from '@/domain/chat/enterprise/entities/group/chat.js'
import type { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat.js'
import {
  isGroupChat,
  isPrivateChat,
} from '@/domain/chat/enterprise/type-guards/chat.js'
import type { Chat } from '@/domain/chat/enterprise/types/chat.js'
import { Pagination } from '@/domain/shared/entities/pagination.js'

export class InMemoryChatsRepository implements ChatsRepository {
  items: Chat[] = []

  async findUniqueByWAChatIdAndInstanceId({
    instanceId,
    waChatId,
  }: ChatsRepositoryFindUniqueByWAChatIdAndInstanceIdParams): Promise<Chat | null> {
    const item = this.items.find(
      item =>
        item.waChatId.equals(waChatId) && item.instanceId.equals(instanceId)
    )

    return item ?? null
  }

  async findUniqueGroupChatByWAChatIdAndInstanceId({
    instanceId,
    waChatId,
  }: ChatsRepositoryFindUniqueGroupChatByWAChatIdAndInstanceIdParams): Promise<GroupChat | null> {
    const item = this.items.find(
      (item): item is GroupChat =>
        item.waChatId.equals(waChatId) &&
        item.instanceId.equals(instanceId) &&
        isGroupChat(item)
    )

    return item ?? null
  }

  async findUniquePrivateChatByWAChatIdAndInstanceId({
    instanceId,
    waChatId,
  }: ChatsRepositoryFindUniquePrivateChatByWAChatIdAndInstanceIdParams): Promise<PrivateChat | null> {
    const item = this.items.find(
      (item): item is PrivateChat =>
        item.waChatId.equals(waChatId) &&
        item.instanceId.equals(instanceId) &&
        isPrivateChat(item)
    )

    return item ?? null
  }

  async countByInstanceId({
    instanceId,
  }: ChatsRepositoryCountByInstanceIdParams): Promise<number> {
    return this.items.filter(item => item.instanceId.equals(instanceId)).length
  }

  async findManyPaginatedByInstanceId({
    instanceId,
    page,
    take,
  }: ChatsRepositoryFindManyPaginatedByInstanceIdParams): Promise<Chat[]> {
    return this.items
      .filter(item => item.instanceId.equals(instanceId))
      .slice(Pagination.skip({ limit: take, page }), page * take)
  }

  async create(chat: Chat): Promise<void> {
    this.items.push(chat)
  }

  async setMessage(chat: Chat): Promise<void> {
    const itemIndex = this.items.findIndex(
      item => item.id.toString() === chat.id.toString()
    )

    const item = this.items[itemIndex]
    if (!item || !chat.lastMessage) return

    item.interact(chat.lastMessage)
  }

  async setUnreadCount(chat: Chat): Promise<void> {
    const itemIndex = this.items.findIndex(
      item => item.id.toString() === chat.id.toString()
    )

    const item = this.items[itemIndex]
    if (!item) return

    item.setUnreadCount(chat.unreadCount)
  }
}
