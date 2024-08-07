import { type Either, failure, success } from '@/core/either'
import { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat'
import type { WAPrivateChat } from '@/domain/chat/enterprise/entities/wa/private/chat'
import type { Chat } from '@/domain/chat/enterprise/types/chat'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import type { ChatsRepository } from '../../repositories/chats-repository'
import type { ContactsRepository } from '../../repositories/contacts-repository'
import type { CreateContactFromWAContact } from '../contact/create-contact-from-wa-contact-use-case'

interface CreatePrivateChatFromWAChatUseCaseRequest {
	waChat: WAPrivateChat
}

type CreatePrivateChatFromWAChatUseCaseResponse = Either<
	ResourceAlreadyExistsError,
	{
		chat: Chat
	}
>

export class CreatePrivateChatFromWAChatUseCase {
	constructor(
		private chatsRepository: ChatsRepository,
		private contactsRepository: ContactsRepository,
		private createContactFromWAContact: CreateContactFromWAContact,
	) {}

	async execute(
		request: CreatePrivateChatFromWAChatUseCaseRequest,
	): Promise<CreatePrivateChatFromWAChatUseCaseResponse> {
		const { waChat } = request

		const someChat =
			await this.chatsRepository.findUniqueByWAChatIdAndInstanceId({
				instanceId: waChat.instanceId,
				waChatId: waChat.id,
			})

		if (someChat) {
			return failure(new ResourceAlreadyExistsError({ id: waChat.ref }))
		}

		let contact =
			await this.contactsRepository.findUniqueByWAContactIdAndInstanceId({
				instanceId: waChat.contact.instanceId,
				waContactId: waChat.contact.id,
			})

		if (!contact) {
			const result = await this.createContactFromWAContact.execute({
				waContact: waChat.contact,
			})

			if (result.isFailure()) return failure(result.value)
			contact = result.value.contact
		}

		const chat = PrivateChat.create({
			contactId: contact.id,
			instanceId: waChat.instanceId,
			unreadCount: waChat.unreadCount,
			waChatId: waChat.id,
		})

		await this.chatsRepository.create(chat)

		return success({
			chat,
		})
	}
}
