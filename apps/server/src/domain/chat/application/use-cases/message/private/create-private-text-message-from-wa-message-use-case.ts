import { type Either, failure, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrivateTextMessage } from '@/domain/chat/enterprise/entities/private/text-message'
import type { WAPrivateMessage } from '@/domain/chat/enterprise/entities/wa/private/message'
import type { PrivateMessage } from '@/domain/chat/enterprise/types/message'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { AttendantsRepository } from '../../../repositories/attendants-repository'
import type { ChatsRepository } from '../../../repositories/chats-repository'
import type { MessagesRepository } from '../../../repositories/messages-repository'
import type { DateService } from '../../../services/date-service'

interface CreatePrivateTextMessageFromWAMessageUseCaseRequest {
	waMessage: WAPrivateMessage
	attendantId?: UniqueEntityID
}

type CreatePrivateTextMessageFromWAMessageUseCaseResponse = Either<
	ResourceNotFoundError | InvalidResourceFormatError,
	{
		message: PrivateTextMessage
	}
>

export class CreatePrivateTextMessageFromWAMessageUseCase {
	constructor(
		private chatsRepository: ChatsRepository,
		private messagesRepository: MessagesRepository,
		private attendantsRepository: AttendantsRepository,
		private dateService: DateService,
	) {}

	async execute(
		request: CreatePrivateTextMessageFromWAMessageUseCaseRequest,
	): Promise<CreatePrivateTextMessageFromWAMessageUseCaseResponse> {
		const { waMessage, attendantId } = request

		const hasInvalidFormat = waMessage.type !== 'text'
		if (hasInvalidFormat) {
			return failure(new InvalidResourceFormatError({ id: waMessage.ref }))
		}

		const [chat, attendant] = await Promise.all([
			this.chatsRepository.findUniquePrivateChatByWAChatIdAndInstanceId({
				instanceId: waMessage.instanceId,
				waChatId: waMessage.waChatId,
			}),
			attendantId &&
				this.attendantsRepository.findUniqueByIdAndInstanceId({
					attendantId,
					instanceId: waMessage.instanceId,
				}),
		])

		if (!chat) {
			return failure(
				new ResourceNotFoundError({
					id: `${waMessage.instanceId.toString()}/${waMessage.waChatId.toString()}`,
				}),
			)
		}

		if (attendantId && !attendant) {
			return failure(new ResourceNotFoundError({ id: attendantId.toString() }))
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
			sentBy: attendant,
		})

		await this.messagesRepository.create(message)

		return success({ message })
	}
}
