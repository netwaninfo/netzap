import { type Either, failure, success } from '@/core/either'
import type { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import type { WAChat } from '../../enterprise/types/wa-chat'
import type { WAMessage } from '../../enterprise/types/wa-message'
import type { ChatsRepository } from '../repositories/chats-repository'
import type { CreateChatFromWAChatUseCase } from '../use-cases/chat/create-chat-from-wa-chat-use-case'

interface HandleReceivedRequestMessage {
	waMessage: WAMessage
	waChat: WAChat
}

type HandleReceivedResponseMessage = Either<ResourceAlreadyExistsError, {}>

export class HandleReceivedMessage {
	constructor(
		private chatsRepository: ChatsRepository,
		private createChatFromWAChat: CreateChatFromWAChatUseCase,
	) {}

	async execute(
		request: HandleReceivedRequestMessage,
	): Promise<HandleReceivedResponseMessage> {
		const { waChat, waMessage } = request

		let chat = await this.chatsRepository.findUniqueByWAChatIdAndInstanceId({
			instanceId: waChat.instanceId,
			waChatId: waChat.id,
		})

		if (!chat) {
			const response = await this.createChatFromWAChat.execute({ waChat })
			if (response.isFailure()) return failure(response.value)

			chat = response.value.chat
		}

		return success({})
	}
}
