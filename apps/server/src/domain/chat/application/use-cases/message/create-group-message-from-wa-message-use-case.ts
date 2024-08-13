import { type Either, failure, success } from '@/core/either'
import type { WAGroupMessage } from '@/domain/chat/enterprise/entities/wa/group/message'
import type { GroupMessage } from '@/domain/chat/enterprise/types/message'
import type { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import type { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import type { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { ContactsRepository } from '../../repositories/contacts-repository'
import type { CreateContactFromWAContactUseCase } from '../contact/create-contact-from-wa-contact-use-case'
import type { CreateGroupAudioMessageFromWAMessageUseCase } from './create-group-audio-message-from-wa-message-use-case'
import type { CreateGroupDocumentMessageFromWAMessageUseCase } from './create-group-document-message-from-wa-message-use-case'
import type { CreateGroupImageMessageFromWAMessageUseCase } from './create-group-image-message-from-wa-message-use-case'
import type { CreateGroupMultiVCardMessageFromWAMessageUseCase } from './create-group-multi-card-message-from-wa-message-use-case'
import type { CreateGroupRevokedMessageFromWAMessageUseCase } from './create-group-revoked-message-from-wa-message-use-case'
import type { CreateGroupTextMessageFromWAMessageUseCase } from './create-group-text-message-from-wa-message-use-case'
import type { CreateGroupUnknownMessageFromWAMessageUseCase } from './create-group-unknown-message-from-wa-message-use-case'
import type { CreateGroupVCardMessageFromWAMessageUseCase } from './create-group-v-card-message-from-wa-message-use-case'
import type { CreateGroupVideoMessageFromWAMessageUseCase } from './create-group-video-message-from-wa-message-use-case'
import type { CreateGroupVoiceMessageFromWAMessageUseCase } from './create-group-voice-message-from-wa-message-use-case'

interface CreateGroupMessageFromWAMessageUseCaseRequest {
	waMessage: WAGroupMessage
}

type CreateGroupMessageFromWAMessageUseCaseResponse = Either<
	| ResourceNotFoundError
	| InvalidResourceFormatError
	| ResourceAlreadyExistsError
	| null,
	{
		message: GroupMessage
	}
>

export class CreateGroupMessageFromWAMessageUseCase {
	constructor(
		private contactsRepository: ContactsRepository,
		private createContactFromWAContact: CreateContactFromWAContactUseCase,
		private createGroupAudioMessageFromWAMessage: CreateGroupAudioMessageFromWAMessageUseCase,
		private createGroupDocumentMessageFromWAMessage: CreateGroupDocumentMessageFromWAMessageUseCase,
		private createGroupImageMessageFromWAMessage: CreateGroupImageMessageFromWAMessageUseCase,
		private createGroupMultiVCardMessageFromWAMessage: CreateGroupMultiVCardMessageFromWAMessageUseCase,
		private createGroupRevokedMessageFromWAMessage: CreateGroupRevokedMessageFromWAMessageUseCase,
		private createGroupTextMessageFromWAMessage: CreateGroupTextMessageFromWAMessageUseCase,
		private createGroupUnknownMessageFromWAMessage: CreateGroupUnknownMessageFromWAMessageUseCase,
		private createGroupVCardMessageFromWAMessage: CreateGroupVCardMessageFromWAMessageUseCase,
		private createGroupVideoMessageFromWAMessage: CreateGroupVideoMessageFromWAMessageUseCase,
		private createGroupVoiceMessageFromWAMessage: CreateGroupVoiceMessageFromWAMessageUseCase,
	) {}

	async execute(
		request: CreateGroupMessageFromWAMessageUseCaseRequest,
	): Promise<CreateGroupMessageFromWAMessageUseCaseResponse> {
		const { waMessage } = request

		const author =
			await this.contactsRepository.findUniqueByWAContactIdAndInstanceId({
				instanceId: waMessage.instanceId,
				waContactId: waMessage.author.id,
			})

		if (!author) {
			const response = await this.createContactFromWAContact.execute({
				waContact: waMessage.author,
			})

			if (response.isFailure()) return failure(response.value)
		}

		switch (waMessage.type) {
			case 'audio': {
				const response =
					await this.createGroupAudioMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}

			case 'document': {
				const response =
					await this.createGroupDocumentMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}

			case 'image': {
				const response =
					await this.createGroupImageMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}

			case 'multi_vcard': {
				const response =
					await this.createGroupMultiVCardMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}

			case 'vcard': {
				const response =
					await this.createGroupVCardMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}

			case 'revoked': {
				const response =
					await this.createGroupRevokedMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}

			case 'video': {
				const response =
					await this.createGroupVideoMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}

			case 'voice': {
				const response =
					await this.createGroupVoiceMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}

			case 'text': {
				const response = await this.createGroupTextMessageFromWAMessage.execute(
					{
						waMessage,
					},
				)

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}

			default: {
				const response =
					await this.createGroupUnknownMessageFromWAMessage.execute({
						waMessage,
					})

				if (response.isFailure()) return failure(response.value)
				const { message } = response.value

				return success({ message })
			}
		}
	}
}
