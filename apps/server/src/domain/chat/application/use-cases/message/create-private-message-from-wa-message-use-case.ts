import { type Either, failure, success } from '@/core/either'
import type { WAPrivateMessage } from '@/domain/chat/enterprise/entities/wa/private/message'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { ChatsRepository } from '../../repositories/chats-repository'

interface CreatePrivateMessageFromWAMessageRequest {
	waMessage: WAPrivateMessage
}

type CreatePrivateMessageFromWAMessageResponse = Either<
	ResourceNotFoundError,
	{}
>

export class CreatePrivateMessageFromWAMessage {
	constructor(private chatsRepository: ChatsRepository) {}

	async execute(
		request: CreatePrivateMessageFromWAMessageRequest,
	): Promise<CreatePrivateMessageFromWAMessageResponse> {
		const { waMessage } = request

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

		if (waMessage.hasMedia()) {
		}

		return success({})
	}
}
