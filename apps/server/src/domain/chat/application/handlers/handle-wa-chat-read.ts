import { type Either, failure, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { WAEntityID } from '../../enterprise/entities/value-objects/wa-entity-id'
import type { Chat } from '../../enterprise/types/chat'
import type { ChatsRepository } from '../repositories/chats-repository'

interface HandleWAChatReadRequest {
	instanceId: UniqueEntityID
	waChatId: WAEntityID
}

type HandleWAChatReadResponse = Either<
	ResourceNotFoundError,
	{
		chat: Chat
	}
>

export class HandleWAChatRead {
	constructor(private chatsRepository: ChatsRepository) {}

	async execute(
		request: HandleWAChatReadRequest,
	): Promise<HandleWAChatReadResponse> {
		const { instanceId, waChatId } = request

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

		chat.read()
		await this.chatsRepository.save(chat)

		return success({ chat })
	}
}
