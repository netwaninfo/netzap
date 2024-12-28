import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { PaginationParams } from '@/domain/shared/repositories/pagination-params.js'
import type { GroupChat } from '../../enterprise/entities/group/chat.js'
import type { PrivateChat } from '../../enterprise/entities/private/chat.js'
import type { WAEntityID } from '../../enterprise/entities/value-objects/wa-entity-id.js'
import type { Chat } from '../../enterprise/types/chat.js'

export interface ChatsRepositoryFindUniqueByWAChatIdAndInstanceIdParams {
  waChatId: WAEntityID
  instanceId: UniqueEntityID
}

export interface ChatsRepositoryFindUniquePrivateChatByWAChatIdAndInstanceIdParams {
  waChatId: WAEntityID
  instanceId: UniqueEntityID
}

export interface ChatsRepositoryFindUniqueGroupChatByWAChatIdAndInstanceIdParams {
  waChatId: WAEntityID
  instanceId: UniqueEntityID
}

export interface ChatsRepositoryFindManyPaginatedByInstanceIdParams
  extends PaginationParams {
  instanceId: UniqueEntityID
}

export interface ChatsRepositoryCountByInstanceIdParams {
  instanceId: UniqueEntityID
}

export abstract class ChatsRepository {
  abstract findUniqueByWAChatIdAndInstanceId(
    params: ChatsRepositoryFindUniqueByWAChatIdAndInstanceIdParams
  ): Promise<Chat | null>

  abstract findUniquePrivateChatByWAChatIdAndInstanceId(
    params: ChatsRepositoryFindUniquePrivateChatByWAChatIdAndInstanceIdParams
  ): Promise<PrivateChat | null>

  abstract findUniqueGroupChatByWAChatIdAndInstanceId(
    params: ChatsRepositoryFindUniqueGroupChatByWAChatIdAndInstanceIdParams
  ): Promise<GroupChat | null>

  abstract findManyPaginatedByInstanceId(
    params: ChatsRepositoryFindManyPaginatedByInstanceIdParams
  ): Promise<Chat[]>

  abstract countByInstanceId(
    params: ChatsRepositoryCountByInstanceIdParams
  ): Promise<number>

  abstract create(chat: Chat): Promise<void>

  // ----
  abstract setMessage(chat: Chat): Promise<void>

  abstract setUnreadCount(chat: Chat): Promise<void>
}
