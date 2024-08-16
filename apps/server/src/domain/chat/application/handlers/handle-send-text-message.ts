import { type Either, failure, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { WAEntityID } from '../../enterprise/entities/value-objects/wa-entity-id'
import type { WAMessageID } from '../../enterprise/entities/value-objects/wa-message-id'
import type { Chat } from '../../enterprise/types/chat'
import type { Message } from '../../enterprise/types/message'
import type { ChatsRepository } from '../repositories/chats-repository'
import type { WhatsAppService } from '../services/whats-app-service'
import type { CreateTextMessageFromWAMessageUseCase } from '../use-cases/message/create-text-message-from-wa-message-use-case'

interface HandleSendTextMessageRequest {
	instanceId: UniqueEntityID
	waChatId: WAEntityID
	body: string
	quotedId?: WAMessageID
	attendantId: UniqueEntityID
}

type HandleSendTextMessageResponse = Either<
	ResourceNotFoundError | InvalidResourceFormatError,
	{
		message: Message
		chat: Chat
	}
>

export class HandleSendTextMessage {
	constructor(
		private chatsRepository: ChatsRepository,
		private createTextMessageFromWAMessage: CreateTextMessageFromWAMessageUseCase,
		private whatsAppService: WhatsAppService,
	) {}

	async execute(
		request: HandleSendTextMessageRequest,
	): Promise<HandleSendTextMessageResponse> {
		const { attendantId, body, instanceId, waChatId, quotedId } = request

		const chat = await this.chatsRepository.findUniqueByWAChatIdAndInstanceId({
			instanceId,
			waChatId,
		})

		if (!chat) {
			return failure(
				new ResourceNotFoundError({
					id: `${instanceId.toString()}/${waChatId.toString()}`,
				}),
			)
		}

		const waMessage = await this.whatsAppService.sendTextMessage({
			body,
			instanceId,
			waChatId,
			quotedId,
		})

		const response = await this.createTextMessageFromWAMessage.execute({
			waMessage,
			attendantId,
		})

		if (response.isFailure()) return failure(response.value)
		const { message } = response.value

		chat.interact(message)
		await this.chatsRepository.save(chat)

		return success({ message, chat })
	}
}
