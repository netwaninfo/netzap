import { type Either, success } from '@/core/either'
import type { WAMessage } from '@/domain/chat/enterprise/types/wa-message'
import type { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'

interface CreateMessageFromWAMessageUseCaseRequest {
	waMessage: WAMessage
}

type CreateMessageFromWAMessageUseCaseResponse = Either<
	ResourceNotFoundError,
	{}
>

export class CreateMessageFromWAMessageUseCase {
	constructor() {}

	async execute(
		request: CreateMessageFromWAMessageUseCaseRequest,
	): Promise<CreateMessageFromWAMessageUseCaseResponse> {
		const { waMessage } = request

		return success({})
	}
}
