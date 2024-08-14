import type {
	MessagesRepository,
	MessagesRepositoryCountByInstanceIdAndWAChatIdParams,
	MessagesRepositoryFindManyPaginatedByInstanceIdAndWAChatId,
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
				isPrivateMessage(item),
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
				isGroupMessage(item),
		)

		return message ?? null
	}

	async findManyPaginatedByInstanceIdAndWAChatId({
		instanceId,
		page,
		take,
		waChatId,
	}: MessagesRepositoryFindManyPaginatedByInstanceIdAndWAChatId): Promise<
		Message[]
	> {
		return this.items
			.filter(
				(item) =>
					item.instanceId.equals(instanceId) && item.waChatId.equals(waChatId),
			)
			.slice(Pagination.skip({ limit: take, page }), page * take)
	}

	async countByInstanceIdAndWAChatId({
		instanceId,
		waChatId,
	}: MessagesRepositoryCountByInstanceIdAndWAChatIdParams): Promise<number> {
		return this.items.filter(
			(item) =>
				item.instanceId.equals(instanceId) && item.waChatId.equals(waChatId),
		).length
	}

	async create(message: Message): Promise<void> {
		this.items.push(message)
	}
}
