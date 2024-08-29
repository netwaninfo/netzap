import { type Either, failure, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { WAEntityID } from '../../enterprise/entities/value-objects/wa-entity-id'
import type { WAMessageID } from '../../enterprise/entities/value-objects/wa-message-id'
import type { Chat } from '../../enterprise/types/chat'
import type { Message } from '../../enterprise/types/message'
import { ChatEmitter } from '../emitters/chat-emitter'
import { MessageEmitter } from '../emitters/message-emitter'
import { AttendantsRepository } from '../repositories/attendants-repository'
import type { ChatsRepository } from '../repositories/chats-repository'
import type { WhatsAppService } from '../services/whats-app-service'
import { CreateChatFromWAChatUseCase } from '../use-cases/chats/create-chat-from-wa-chat-use-case'
import type { CreateTextMessageFromWAMessageUseCase } from '../use-cases/messages/create-text-message-from-wa-message-use-case'

interface HandleSendTextMessageRequest {
	instanceId: UniqueEntityID
	waChatId: WAEntityID
	body: string
	quotedId?: WAMessageID
	attendantId: UniqueEntityID
}

type HandleSendTextMessageResponse = Either<
	| ResourceNotFoundError
	| InvalidResourceFormatError
	| ResourceAlreadyExistsError
	| null,
	{
		message: Message
		chat: Chat
	}
>

export class HandleSendTextMessage {
	constructor(
		private chatsRepository: ChatsRepository,
		private attendantsRepository: AttendantsRepository,
		private createChatFromWAChat: CreateChatFromWAChatUseCase,
		private createTextMessageFromWAMessage: CreateTextMessageFromWAMessageUseCase,
		private whatsAppService: WhatsAppService,
		private messageEmitter: MessageEmitter,
		private chatEmitter: ChatEmitter,
	) {}

	async execute(
		request: HandleSendTextMessageRequest,
	): Promise<HandleSendTextMessageResponse> {
		const { attendantId, body, instanceId, waChatId, quotedId } = request

		const attendant =
			await this.attendantsRepository.findUniqueByAttendantIdAndInstanceId({
				attendantId,
				instanceId,
			})

		if (!attendant) {
			return failure(new ResourceNotFoundError({ id: attendantId.toString() }))
		}

		let chat = await this.chatsRepository.findUniqueByWAChatIdAndInstanceId({
			instanceId,
			waChatId,
		})

		if (!chat) {
			const waChat = await this.whatsAppService.getChatByWAChatId({
				instanceId,
				waChatId,
			})

			if (!waChat) {
				return failure(
					new ResourceNotFoundError({
						id: `${instanceId.toString()}/${waChatId.toString()}`,
					}),
				)
			}

			const response = await this.createChatFromWAChat.execute({ waChat })
			if (response.isFailure()) return failure(response.value)

			chat = response.value.chat
			this.chatEmitter.emitCreate({ chat })
		}

		const content = attendant.displayName.concat('\n', body)
		const waMessage = await this.whatsAppService.sendTextMessage({
			body: content,
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
		this.messageEmitter.emitCreate({ message })

		chat.interact(message)
		await this.chatsRepository.save(chat)
		this.chatEmitter.emitChange({ chat })

		return success({ message, chat })
	}
}
