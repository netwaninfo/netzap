import { type Either, failure, success } from '@/core/either'
import type { WAPrivateMessage } from '@/domain/chat/enterprise/entities/wa/private/message'
import type { PrivateMessage } from '@/domain/chat/enterprise/types/message'
import type { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import type { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import type { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { CreatePrivateAudioMessageFromWAMessageUseCase } from './create-private-audio-message-from-wa-message-use-case'
import type { CreatePrivateDocumentMessageFromWAMessageUseCase } from './create-private-document-message-from-wa-message-use-case'
import type { CreatePrivateImageMessageFromWAMessageUseCase } from './create-private-image-message-from-wa-message-use-case'
import type { CreatePrivateMultiVCardMessageFromWAMessageUseCase } from './create-private-multi-card-message-from-wa-message-use-case'
import type { CreatePrivateRevokedMessageFromWAMessageUseCase } from './create-private-revoked-message-from-wa-message-use-case'
import type { CreatePrivateTextMessageFromWAMessageUseCase } from './create-private-text-message-from-wa-message-use-case'
import type { CreatePrivateUnknownMessageFromWAMessageUseCase } from './create-private-unknown-message-from-wa-message-use-case'
import type { CreatePrivateVCardMessageFromWAMessageUseCase } from './create-private-v-card-message-from-wa-message-use-case'
import type { CreatePrivateVideoMessageFromWAMessageUseCase } from './create-private-video-message-from-wa-message-use-case'
import type { CreatePrivateVoiceMessageFromWAMessageUseCase } from './create-private-voice-message-from-wa-message-use-case'

interface CreatePrivateMessageFromWAMessageUseCaseRequest {
	waMessage: WAPrivateMessage
}

type CreatePrivateMessageFromWAMessageUseCaseResponse = Either<
	| ResourceNotFoundError
	| InvalidResourceFormatError
	| ResourceAlreadyExistsError
	| null,
	{
		message: PrivateMessage
	}
>

export class CreatePrivateMessageFromWAMessageUseCase {
	constructor(
		private createPrivateAudioMessageFromWAMessage: CreatePrivateAudioMessageFromWAMessageUseCase,
		private createPrivateDocumentMessageFromWAMessage: CreatePrivateDocumentMessageFromWAMessageUseCase,
		private createPrivateImageMessageFromWAMessage: CreatePrivateImageMessageFromWAMessageUseCase,
		private createPrivateMultiVCardMessageFromWAMessage: CreatePrivateMultiVCardMessageFromWAMessageUseCase,
		private createPrivateRevokedMessageFromWAMessage: CreatePrivateRevokedMessageFromWAMessageUseCase,
		private createPrivateTextMessageFromWAMessage: CreatePrivateTextMessageFromWAMessageUseCase,
		private createPrivateUnknownMessageFromWAMessage: CreatePrivateUnknownMessageFromWAMessageUseCase,
		private createPrivateVCardMessageFromWAMessage: CreatePrivateVCardMessageFromWAMessageUseCase,
		private createPrivateVideoMessageFromWAMessage: CreatePrivateVideoMessageFromWAMessageUseCase,
		private createPrivateVoiceMessageFromWAMessage: CreatePrivateVoiceMessageFromWAMessageUseCase,
	) {}

	async execute(
		request: CreatePrivateMessageFromWAMessageUseCaseRequest,
	): Promise<CreatePrivateMessageFromWAMessageUseCaseResponse> {
		const { waMessage } = request

		switch (waMessage.type) {
			case 'audio': {
				const response =
					await this.createPrivateAudioMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}

			case 'document': {
				const response =
					await this.createPrivateDocumentMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}

			case 'image': {
				const response =
					await this.createPrivateImageMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}

			case 'multi_vcard': {
				const response =
					await this.createPrivateMultiVCardMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}

			case 'vcard': {
				const response =
					await this.createPrivateVCardMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}

			case 'revoked': {
				const response =
					await this.createPrivateRevokedMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}

			case 'video': {
				const response =
					await this.createPrivateVideoMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}

			case 'voice': {
				const response =
					await this.createPrivateVoiceMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}

			case 'text': {
				const response =
					await this.createPrivateTextMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}

			default: {
				const response =
					await this.createPrivateUnknownMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}
		}
	}
}
