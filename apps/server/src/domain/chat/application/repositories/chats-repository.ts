import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { PaginationParams } from '@/domain/shared/repositories/pagination-params'
import type { GroupChat } from '../../enterprise/entities/group/chat'
import type { PrivateChat } from '../../enterprise/entities/private/chat'
import type { WAEntityID } from '../../enterprise/entities/value-objects/wa-entity-id'
import type { Chat } from '../../enterprise/types/chat'

export interface ChatsRepositoryFindUniqueByWAChatIdAndInstanceId {
	waChatId: WAEntityID
	instanceId: UniqueEntityID
}

export interface ChatsRepositoryFindUniquePrivateChatByWAChatIdAndInstanceId {
	waChatId: WAEntityID
	instanceId: UniqueEntityID
}

export interface ChatsRepositoryFindUniqueGroupChatByWAChatIdAndInstanceId {
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
		params: ChatsRepositoryFindUniqueByWAChatIdAndInstanceId,
	): Promise<Chat | null>

	abstract findUniquePrivateChatByWAChatIdAndInstanceId(
		params: ChatsRepositoryFindUniquePrivateChatByWAChatIdAndInstanceId,
	): Promise<PrivateChat | null>

	abstract findUniqueGroupChatByWAChatIdAndInstanceId(
		params: ChatsRepositoryFindUniqueGroupChatByWAChatIdAndInstanceId,
	): Promise<GroupChat | null>

	abstract findManyPaginatedByInstanceId(
		params: ChatsRepositoryFindManyPaginatedByInstanceIdParams,
	): Promise<Chat[]>

	abstract countByInstanceId(
		params: ChatsRepositoryCountByInstanceIdParams,
	): Promise<number>

	abstract create(chat: Chat): Promise<void>

	abstract save(chat: Chat): Promise<void>
}
