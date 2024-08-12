import { Readable } from 'node:stream'
import { type Either, failure, success } from '@/core/either'
import { MessageMedia } from '@/domain/chat/enterprise/entities/message-media'
import type { WAMessage } from '@/domain/chat/enterprise/types/wa-message'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import type { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { StorageService } from '../../services/storage-service'

interface CreateMessageMediaFromWAMessageUseCaseRequest {
	waMessage: WAMessage
}

type CreateMessageMediaFromWAMessageUseCaseResponse = Either<
	ResourceNotFoundError | InvalidResourceFormatError,
	{
		media: MessageMedia
	}
>

export class CreateMessageMediaFromWAMessageUseCase {
	constructor(private storageService: StorageService) {}

	async execute(
		request: CreateMessageMediaFromWAMessageUseCaseRequest,
	): Promise<CreateMessageMediaFromWAMessageUseCaseResponse> {
		const { waMessage } = request

		if (!waMessage.hasMedia()) {
			return failure(new InvalidResourceFormatError({ id: waMessage.ref }))
		}

		const waMessageMedia = waMessage.media
		const extension = waMessageMedia.mimeType.extension()

		const storageObject = await this.storageService.put({
			filename: `${waMessage.ref}.${extension}`,
			mimeType: waMessageMedia.mimeType,
			data: Readable.from(Buffer.from(waMessageMedia.data, 'base64')),
		})

		const media = MessageMedia.create({
			key: storageObject.path,
			url: storageObject.url,
			mimeType: storageObject.mimeType,
		})

		return success({ media })
	}
}
