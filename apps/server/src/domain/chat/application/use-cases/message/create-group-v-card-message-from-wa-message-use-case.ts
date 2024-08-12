import { type Either, failure, success } from '@/core/either'
import { GroupVCardMessage } from '@/domain/chat/enterprise/entities/group/v-card-message'
import type { WAGroupMessage } from '@/domain/chat/enterprise/entities/wa/group/message'
import type { GroupMessage } from '@/domain/chat/enterprise/types/message'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import type { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { ChatsRepository } from '../../repositories/chats-repository'
import type { ContactsRepository } from '../../repositories/contacts-repository'
import type { MessagesRepository } from '../../repositories/messages-repository'
import type { DateService } from '../../services/date-service'
import type { CreateContactFromWAContactUseCase } from '../contact/create-contact-from-wa-contact-use-case'

interface CreateGroupVCardMessageFromWAMessageRequest {
	waMessage: WAGroupMessage
}

type CreateGroupVCardMessageFromWAMessageResponse = Either<
	| ResourceNotFoundError
	| InvalidResourceFormatError
	| ResourceAlreadyExistsError,
	{
		message: GroupVCardMessage
	}
>

export class CreateGroupVCardMessageFromWAMessage {
	constructor(
		private chatsRepository: ChatsRepository,
		private messagesRepository: MessagesRepository,
		private contactsRepository: ContactsRepository,
		private createContactFromWAContact: CreateContactFromWAContactUseCase,
		private dateService: DateService,
	) {}

	async execute(
		request: CreateGroupVCardMessageFromWAMessageRequest,
	): Promise<CreateGroupVCardMessageFromWAMessageResponse> {
		const { waMessage } = request

		const waContact = waMessage.contacts?.at(0)
		const hasInvalidFormat =
			waMessage.type !== 'vcard' || !waMessage.hasContacts() || !waContact

		if (hasInvalidFormat) {
			return failure(new InvalidResourceFormatError({ id: waMessage.ref }))
		}

		const [chat, author] = await Promise.all([
			this.chatsRepository.findUniqueGroupChatByWAChatIdAndInstanceId({
				instanceId: waMessage.instanceId,
				waChatId: waMessage.waChatId,
			}),
			this.contactsRepository.findUniqueByWAContactIdAndInstanceId({
				instanceId: waMessage.instanceId,
				waContactId: waMessage.author.id,
			}),
		])

		if (!chat) {
			return failure(
				new ResourceNotFoundError({
					id: `${waMessage.instanceId.toString()}/${waMessage.waChatId.toString()}`,
				}),
			)
		}

		if (!author) {
			return failure(new ResourceNotFoundError({ id: waMessage.author.ref }))
		}

		let quoted: GroupMessage | null = null

		if (waMessage.hasQuoted()) {
			quoted =
				await this.messagesRepository.findUniqueGroupMessageByChatIAndWAMessageId(
					{
						chatId: chat.id,
						waMessageId: waMessage.quoted.id,
					},
				)
		}

		let contact =
			await this.contactsRepository.findUniqueByWAContactIdAndInstanceId({
				instanceId: waMessage.instanceId,
				waContactId: waContact.id,
			})

		if (!contact) {
			const response = await this.createContactFromWAContact.execute({
				waContact,
			})

			if (response.isFailure()) return failure(response.value)
			contact = response.value.contact
		}

		const message = GroupVCardMessage.create({
			author,
			quoted,
			contact,
			chatId: chat.id,
			instanceId: chat.instanceId,
			waChatId: chat.waChatId,
			waMessageId: waMessage.id,
			isForwarded: waMessage.isForwarded,
			createdAt: this.dateService.fromUnix(waMessage.timestamp).toDate(),
			isFromMe: waMessage.isFromMe,
			status: waMessage.ack,
		})

		await this.messagesRepository.create(message)

		return success({ message })
	}
}
