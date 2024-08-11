import { type Either, failure, success } from '@/core/either'
import { GroupRevokedMessage } from '@/domain/chat/enterprise/entities/group/revoked-message'
import type { WAGroupMessage } from '@/domain/chat/enterprise/entities/wa/group/message'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { ChatsRepository } from '../../repositories/chats-repository'
import type { ContactsRepository } from '../../repositories/contacts-repository'
import type { MessagesRepository } from '../../repositories/messages-repository'
import type { DateService } from '../../services/date-service'

interface CreateGroupRevokedMessageFromWAMessageRequest {
	waMessage: WAGroupMessage
}

type CreateGroupRevokedMessageFromWAMessageResponse = Either<
	ResourceNotFoundError | InvalidResourceFormatError,
	{
		message: GroupRevokedMessage
	}
>

export class CreateGroupRevokedMessageFromWAMessage {
	constructor(
		private chatsRepository: ChatsRepository,
		private contactsRepository: ContactsRepository,
		private messagesRepository: MessagesRepository,
		private dateService: DateService,
	) {}

	async execute(
		request: CreateGroupRevokedMessageFromWAMessageRequest,
	): Promise<CreateGroupRevokedMessageFromWAMessageResponse> {
		const { waMessage } = request

		const hasInvalidFormat = waMessage.type !== 'revoked'
		if (hasInvalidFormat) {
			return failure(new InvalidResourceFormatError({ id: waMessage.ref }))
		}

		const [chat, author] = await Promise.all([
			this.chatsRepository.findUniqueGroupChatByWAChatIdAndInstanceId({
				instanceId: waMessage.instanceId,
				waChatId: waMessage.waChatId,
			}),
			this.contactsRepository.findUniqueByWAContactIdAndInstanceId({
				instanceId: waMessage.instanceId,
				waContactId: waMessage.author.id,
			}),
		])

		if (!chat) {
			return failure(
				new ResourceNotFoundError({
					id: `${waMessage.instanceId.toString()}/${waMessage.waChatId.toString()}`,
				}),
			)
		}

		if (!author) {
			return failure(new ResourceNotFoundError({ id: waMessage.author.ref }))
		}

		const createdAndRevokedAt = this.dateService
			.fromUnix(waMessage.timestamp)
			.toDate()

		const message = GroupRevokedMessage.create({
			author,
			chatId: chat.id,
			instanceId: chat.instanceId,
			waChatId: chat.waChatId,
			waMessageId: waMessage.id,
			isForwarded: waMessage.isForwarded,
			createdAt: createdAndRevokedAt,
			revokedAt: createdAndRevokedAt,
			isFromMe: waMessage.isFromMe,
			status: waMessage.ack,
		})

		await this.messagesRepository.create(message)

		return success({ message })
	}
}
