import { type Either, success } from '@/core/either'
import type { WAMessage } from '@/domain/chat/enterprise/types/wa-message'
import type { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'

interface CreateMessageFromWAMessageRequest {
	waMessage: WAMessage
}

type CreateMessageFromWAMessageResponse = Either<ResourceNotFoundError, {}>

export class CreateMessageFromWAMessage {
	constructor() {}

	async execute(
		request: CreateMessageFromWAMessageRequest,
	): Promise<CreateMessageFromWAMessageResponse> {
		const { waMessage } = request

		return success({})
	}
}
