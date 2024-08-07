import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { WAEntityID } from '../../enterprise/entities/value-objects/wa-entity-id'
import type { Chat } from '../../enterprise/types/chat'

export interface ChatsRepositoryFindUniqueByWAChatIdAndInstanceIdParams {
	waChatId: WAEntityID
	instanceId: UniqueEntityID
}

export abstract class ChatsRepository {
	abstract findUniqueByWAChatIdAndInstanceId(
		params: ChatsRepositoryFindUniqueByWAChatIdAndInstanceIdParams,
	): Promise<Chat | null>

	abstract create(chat: Chat): Promise<void>

	abstract save(chat: Chat): Promise<void>
}
