import { type Either, failure, success } from '@/core/either'
import { GroupMultiVCardMessage } from '@/domain/chat/enterprise/entities/group/multi-v-card-message'
import type { WAGroupMessage } from '@/domain/chat/enterprise/entities/wa/group/message'
import type { GroupMessage } from '@/domain/chat/enterprise/types/message'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { ChatsRepository } from '../../../repositories/chats-repository'
import type { ContactsRepository } from '../../../repositories/contacts-repository'
import type { MessagesRepository } from '../../../repositories/messages-repository'
import type { DateService } from '../../../services/date-service'
import type { CreateContactsFromWAContactsUseCase } from '../../contacts/create-contacts-from-wa-contacts-use-case'

interface CreateGroupMultiVCardMessageFromWAMessageUseCaseRequest {
	waMessage: WAGroupMessage
}

type CreateGroupMultiVCardMessageFromWAMessageUseCaseResponse = Either<
	ResourceNotFoundError | InvalidResourceFormatError | null,
	{
		message: GroupMultiVCardMessage
	}
>

export class CreateGroupMultiVCardMessageFromWAMessageUseCase {
	constructor(
		private chatsRepository: ChatsRepository,
		private contactsRepository: ContactsRepository,
		private messagesRepository: MessagesRepository,
		private createContactsFromWAContacts: CreateContactsFromWAContactsUseCase,
		private dateService: DateService,
	) {}

	async execute(
		request: CreateGroupMultiVCardMessageFromWAMessageUseCaseRequest,
	): Promise<CreateGroupMultiVCardMessageFromWAMessageUseCaseResponse> {
		const { waMessage } = request

		const hasInvalidFormat =
			waMessage.type !== 'multi_vcard' || !waMessage.hasContacts()

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

		const response = await this.createContactsFromWAContacts.execute({
			instanceId: waMessage.instanceId,
			waContacts: waMessage.contacts,
		})

		if (response.isFailure()) {
			return failure(response.value)
		}

		const { contacts } = response.value
		const message = GroupMultiVCardMessage.create({
			author,
			quoted,
			contacts,
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
