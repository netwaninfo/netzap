import { type Either, failure, success } from '@/core/either'
import type { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import type { Chat } from '../../enterprise/types/chat'
import type { WAChat } from '../../enterprise/types/wa-chat'
import type { ChatsRepository } from '../repositories/chats-repository'
import type { CreateChatFromWAChatUseCase } from '../use-cases/chat/create-chat-from-wa-chat-use-case'

interface HandleUnreadCountChangeRequest {
	waChat: WAChat
}

type HandleUnreadCountChangeResponse = Either<
	ResourceAlreadyExistsError,
	{
		chat: Chat
	}
>

export class HandleUnreadCountChange {
	constructor(
		private chatsRepository: ChatsRepository,
		private createChatFromWAChat: CreateChatFromWAChatUseCase,
	) {}

	async execute(
		request: HandleUnreadCountChangeRequest,
	): Promise<HandleUnreadCountChangeResponse> {
		const { waChat } = request

		let chat = await this.chatsRepository.findUniqueByWAChatIdAndInstanceId({
			instanceId: waChat.instanceId,
			waChatId: waChat.id,
		})

		if (!chat) {
			const result = await this.createChatFromWAChat.execute({ waChat })

			if (result.isFailure()) return failure(result.value)
			chat = result.value.chat
		}

		chat.changeUnreadCount(waChat.unreadCount)
		await this.chatsRepository.save(chat)

		return success({
			chat,
		})
	}
}
