import { type Either, failure, success } from '@/core/either'
import { PrivateTextMessage } from '@/domain/chat/enterprise/entities/private/text-message'
import type { WAPrivateMessage } from '@/domain/chat/enterprise/entities/wa/private/message'
import type { PrivateMessage } from '@/domain/chat/enterprise/types/message'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { ChatsRepository } from '../../repositories/chats-repository'
import type { MessagesRepository } from '../../repositories/messages-repository'
import type { DateService } from '../../services/date-service'

interface CreatePrivateTextMessageFromWAMessageRequest {
	waMessage: WAPrivateMessage
}

type CreatePrivateTextMessageFromWAMessageResponse = Either<
	ResourceNotFoundError | InvalidResourceFormatError,
	{
		message: PrivateTextMessage
	}
>

export class CreatePrivateTextMessageFromWAMessage {
	constructor(
		private chatsRepository: ChatsRepository,
		private messagesRepository: MessagesRepository,
		private dateService: DateService,
	) {}

	async execute(
		request: CreatePrivateTextMessageFromWAMessageRequest,
	): Promise<CreatePrivateTextMessageFromWAMessageResponse> {
		const { waMessage } = request

		const hasInvalidFormat = waMessage.type !== 'text'
		if (hasInvalidFormat) {
			return failure(new InvalidResourceFormatError({ id: waMessage.ref }))
		}

		const chat = await this.chatsRepository.findUniqueByWAChatIdAndInstanceId({
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

		const message = PrivateTextMessage.create({
			quoted,
			body: waMessage.body,
			chatId: chat.id,
			instanceId: chat.instanceId,
			waChatId: chat.waChatId,
			waMessageId: waMessage.id,
			isForwarded: waMessage.isForwarded,
			createdAt: this.dateService.fromUnix(waMessage.timestamp).toDate(),
			isFromMe: waMessage.isFromMe,
			status: waMessage.ack,
		})

		await this.messagesRepository.create(message)

		return success({ message })
	}
}
