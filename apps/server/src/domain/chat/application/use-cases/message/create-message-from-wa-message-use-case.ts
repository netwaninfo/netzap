import { type Either, failure, success } from '@/core/either'
import { isWAPrivateMessage } from '@/domain/chat/enterprise/type-guards/wa-message'
import type { Message } from '@/domain/chat/enterprise/types/message'
import type { WAMessage } from '@/domain/chat/enterprise/types/wa-message'
import type { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import type { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import type { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { CreateGroupMessageFromWAMessageUseCase } from './group/create-group-message-from-wa-message-use-case'
import type { CreatePrivateMessageFromWAMessageUseCase } from './private/create-private-message-from-wa-message-use-case'

interface CreateMessageFromWAMessageUseCaseRequest {
	waMessage: WAMessage
}

type CreateMessageFromWAMessageUseCaseResponse = Either<
	| ResourceNotFoundError
	| InvalidResourceFormatError
	| ResourceAlreadyExistsError
	| null,
	{
		message: Message
	}
>

export class CreateMessageFromWAMessageUseCase {
	constructor(
		private createPrivateMessageFromWAMessage: CreatePrivateMessageFromWAMessageUseCase,
		private createGroupMessageFromWAMessage: CreateGroupMessageFromWAMessageUseCase,
	) {}

	async execute(
		request: CreateMessageFromWAMessageUseCaseRequest,
	): Promise<CreateMessageFromWAMessageUseCaseResponse> {
		const { waMessage } = request

		if (isWAPrivateMessage(waMessage)) {
			const response = await this.createPrivateMessageFromWAMessage.execute({
				waMessage,
			})

			if (response.isFailure()) return failure(response.value)
			const { message } = response.value

			return success({ message })
		}

		const response = await this.createGroupMessageFromWAMessage.execute({
			waMessage,
		})

		if (response.isFailure()) return failure(response.value)
		const { message } = response.value

		return success({ message })
	}
}
