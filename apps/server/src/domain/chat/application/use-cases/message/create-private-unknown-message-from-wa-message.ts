import { type Either, failure, success } from '@/core/either'
import { PrivateUnknownMessage } from '@/domain/chat/enterprise/entities/private/unknown-message'
import type { WAPrivateMessage } from '@/domain/chat/enterprise/entities/wa/private/message'
import type { PrivateMessage } from '@/domain/chat/enterprise/types/message'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { ChatsRepository } from '../../repositories/chats-repository'
import type { MessagesRepository } from '../../repositories/messages-repository'
import type { DateService } from '../../services/date-service'

interface CreatePrivateUnknownMessageFromWAMessageRequest {
	waMessage: WAPrivateMessage
}

type CreatePrivateUnknownMessageFromWAMessageResponse = Either<
	ResourceNotFoundError | InvalidResourceFormatError,
	{
		message: PrivateUnknownMessage
	}
>

export class CreatePrivateUnknownMessageFromWAMessage {
	constructor(
		private chatsRepository: ChatsRepository,
		private messagesRepository: MessagesRepository,
		private dateService: DateService,
	) {}

	async execute(
		request: CreatePrivateUnknownMessageFromWAMessageRequest,
	): Promise<CreatePrivateUnknownMessageFromWAMessageResponse> {
		const { waMessage } = request

		const hasInvalidFormat = waMessage.type !== 'unknown'
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

		let quoted: PrivateMessage | null = null

		if (waMessage.hasQuoted()) {
			quoted =
				await this.messagesRepository.findUniquePrivateMessageByChatIAndWAMessageId(
					{
						chatId: chat.id,
						waMessageId: waMessage.quoted.id,
					},
				)
		}

		const message = PrivateUnknownMessage.create({
			quoted,
			chatId: chat.id,
			instanceId: chat.instanceId,
			waChatId: chat.waChatId,
			waMessageId: waMessage.id,
			isForwarded: waMessage.isForwarded,
			createdAt: this.dateService.fromUnix(waMessage.timestamp).toDate(),
			isFromMe: waMessage.isFromMe,
			status: waMessage.ack,
			payload: waMessage.raw,
		})

		await this.messagesRepository.create(message)

		return success({ message })
	}
}
