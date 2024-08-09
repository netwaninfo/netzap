import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { WAMessageID } from '../../enterprise/entities/value-objects/wa-message-id'
import type { Message, PrivateMessage } from '../../enterprise/types/message'

export interface MessagesRepositoryFindUniquePrivateMessageByChatIAndWAMessageIdParams {
	chatId: UniqueEntityID
	waMessageId: WAMessageID
}

export abstract class MessagesRepository {
	abstract findUniquePrivateMessageByChatIAndWAMessageId(
		params: MessagesRepositoryFindUniquePrivateMessageByChatIAndWAMessageIdParams,
	): Promise<PrivateMessage | null>

	abstract create(message: Message): Promise<void>
}
