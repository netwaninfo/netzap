import type {
	MessagesRepository,
	MessagesRepositoryFindUniquePrivateMessageByChatIAndWAMessageIdParams,
} from '@/domain/chat/application/repositories/messages-repository'
import { isPrivateMessage } from '@/domain/chat/enterprise/type-guards/message'
import type {
	Message,
	PrivateMessage,
} from '@/domain/chat/enterprise/types/message'

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

	async create(message: Message): Promise<void> {
		this.items.push(message)
	}
}
