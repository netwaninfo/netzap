import { type Either, failure, success } from '@/core/either'
import { PrivateRevokedMessage } from '@/domain/chat/enterprise/entities/private/revoked-message'
import type { WAPrivateMessage } from '@/domain/chat/enterprise/entities/wa/private/message'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { ChatsRepository } from '../../repositories/chats-repository'
import type { MessagesRepository } from '../../repositories/messages-repository'
import type { DateService } from '../../services/date-service'

interface CreatePrivateRevokedMessageFromWAMessageUseCaseRequest {
	waMessage: WAPrivateMessage
}

type CreatePrivateRevokedMessageFromWAMessageUseCaseResponse = Either<
	ResourceNotFoundError | InvalidResourceFormatError,
	{
		message: PrivateRevokedMessage
	}
>

export class CreatePrivateRevokedMessageFromWAMessageUseCase {
	constructor(
		private chatsRepository: ChatsRepository,
		private messagesRepository: MessagesRepository,
		private dateService: DateService,
	) {}

	async execute(
		request: CreatePrivateRevokedMessageFromWAMessageUseCaseRequest,
	): Promise<CreatePrivateRevokedMessageFromWAMessageUseCaseResponse> {
		const { waMessage } = request

		const hasInvalidFormat = waMessage.type !== 'revoked'
		if (hasInvalidFormat) {
			return failure(new InvalidResourceFormatError({ id: waMessage.ref }))
		}

		const chat =
			await this.chatsRepository.findUniquePrivateChatByWAChatIdAndInstanceId({
				instanceId: waMessage.instanceId,
				waChatId: waMessage.waChatId,
			})

		if (!chat) {
			return failure(
				new ResourceNotFoundError({
					id: `${waMessage.instanceId.toString()}/${waMessage.waChatId.toString()}`,
				}),
			)
		}

		const createdAndRevokedAt = this.dateService
			.fromUnix(waMessage.timestamp)
			.toDate()

		const message = PrivateRevokedMessage.create({
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