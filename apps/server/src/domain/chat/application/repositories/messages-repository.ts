import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { PaginationParams } from '@/domain/shared/repositories/pagination-params'
import type { WAEntityID } from '../../enterprise/entities/value-objects/wa-entity-id'
import type { WAMessageID } from '../../enterprise/entities/value-objects/wa-message-id'
import type {
	GroupMessage,
	Message,
	PrivateMessage,
} from '../../enterprise/types/message'

export interface MessagesRepositoryFindUniquePrivateMessageByChatIAndWAMessageIdParams {
	chatId: UniqueEntityID
	waMessageId: WAMessageID
}

export interface MessagesRepositoryFindUniqueGroupMessageByChatIAndWAMessageIdParams {
	chatId: UniqueEntityID
	waMessageId: WAMessageID
}

export interface MessagesRepositoryFindManyPaginatedByInstanceIdAndWAChatId
	extends PaginationParams {
	instanceId: UniqueEntityID
	waChatId: WAEntityID
}

export interface MessagesRepositoryCountByInstanceIdAndWAChatIdParams {
	instanceId: UniqueEntityID
	waChatId: WAEntityID
}

export abstract class MessagesRepository {
	abstract findUniquePrivateMessageByChatIAndWAMessageId(
		params: MessagesRepositoryFindUniquePrivateMessageByChatIAndWAMessageIdParams,
	): Promise<PrivateMessage | null>

	abstract findUniqueGroupMessageByChatIAndWAMessageId(
		params: MessagesRepositoryFindUniqueGroupMessageByChatIAndWAMessageIdParams,
	): Promise<GroupMessage | null>

	abstract findManyPaginatedByInstanceIdAndWAChatId(
		params: MessagesRepositoryFindManyPaginatedByInstanceIdAndWAChatId,
	): Promise<Message[]>

	abstract countByInstanceIdAndWAChatId(
		params: MessagesRepositoryCountByInstanceIdAndWAChatIdParams,
	): Promise<number>

	abstract create(message: Message): Promise<void>
}
