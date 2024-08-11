import { type Either, failure, success } from '@/core/either'
import type { WAGroupMessage } from '@/domain/chat/enterprise/entities/wa/group/message'
import type { GroupMessage } from '@/domain/chat/enterprise/types/message'
import type { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import type { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import type { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { ContactsRepository } from '../../repositories/contacts-repository'
import type { CreateContactFromWAContactUseCase } from '../contact/create-contact-from-wa-contact-use-case'
import type { CreateGroupAudioMessageFromWAMessage } from './create-group-audio-message-from-wa-message'
import type { CreateGroupDocumentMessageFromWAMessage } from './create-group-document-message-from-wa-message'
import type { CreateGroupImageMessageFromWAMessage } from './create-group-image-message-from-wa-message'
import type { CreateGroupMultiVCardMessageFromWAMessage } from './create-group-multi-card-message-from-wa-message'
import type { CreateGroupRevokedMessageFromWAMessage } from './create-group-revoked-message-from-wa-message'
import type { CreateGroupTextMessageFromWAMessage } from './create-group-text-message-from-wa-message'
import type { CreateGroupUnknownMessageFromWAMessage } from './create-group-unknown-message-from-wa-message'
import type { CreateGroupVCardMessageFromWAMessage } from './create-group-v-card-message-from-wa-message'
import type { CreateGroupVideoMessageFromWAMessage } from './create-group-video-message-from-wa-message'
import type { CreateGroupVoiceMessageFromWAMessage } from './create-group-voice-message-from-wa-message'

interface CreateGroupMessageFromWAMessageRequest {
	waMessage: WAGroupMessage
}

type CreateGroupMessageFromWAMessageResponse = Either<
	| ResourceNotFoundError
	| InvalidResourceFormatError
	| ResourceAlreadyExistsError
	| null,
	{
		message: GroupMessage
	}
>

export class CreateGroupMessageFromWAMessage {
	constructor(
		private contactsRepository: ContactsRepository,
		private createContactFromWAContact: CreateContactFromWAContactUseCase,
		private createGroupAudioMessageFromWAMessage: CreateGroupAudioMessageFromWAMessage,
		private createGroupDocumentMessageFromWAMessage: CreateGroupDocumentMessageFromWAMessage,
		private createGroupImageMessageFromWAMessage: CreateGroupImageMessageFromWAMessage,
		private createGroupMultiVCardMessageFromWAMessage: CreateGroupMultiVCardMessageFromWAMessage,
		private createGroupRevokedMessageFromWAMessage: CreateGroupRevokedMessageFromWAMessage,
		private createGroupTextMessageFromWAMessage: CreateGroupTextMessageFromWAMessage,
		private createGroupUnknownMessageFromWAMessage: CreateGroupUnknownMessageFromWAMessage,
		private createGroupVCardMessageFromWAMessage: CreateGroupVCardMessageFromWAMessage,
		private createGroupVideoMessageFromWAMessage: CreateGroupVideoMessageFromWAMessage,
		private createGroupVoiceMessageFromWAMessage: CreateGroupVoiceMessageFromWAMessage,
	) {}

	async execute(
		request: CreateGroupMessageFromWAMessageRequest,
	): Promise<CreateGroupMessageFromWAMessageResponse> {
		const { waMessage } = request

		/**
		 * Check and create the author's contact while there is no event that does this
		 * TODO: Remove after implements some `group_` event
		 */

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

		// ---------------------

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
