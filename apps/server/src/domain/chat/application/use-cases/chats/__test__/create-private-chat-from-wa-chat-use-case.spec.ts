import { makeContact } from '@/test/factories/chat/make-contact'
import { makeWAPrivateChat } from '@/test/factories/chat/wa/make-wa-private-chat'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { CreateContactFromWAContactUseCase } from '../../contacts/create-contact-from-wa-contact-use-case'
import { CreatePrivateChatFromWAChatUseCase } from '../create-private-chat-from-wa-chat-use-case'

describe('CreatePrivateChatFromWAChatUseCase', () => {
	let chatsRepository: InMemoryChatsRepository
	let contactsRepository: InMemoryContactsRepository

	let createContactFromWAContactUseCase: CreateContactFromWAContactUseCase

	let sut: CreatePrivateChatFromWAChatUseCase

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		contactsRepository = new InMemoryContactsRepository()

		createContactFromWAContactUseCase = new CreateContactFromWAContactUseCase(
			contactsRepository,
		)

		sut = new CreatePrivateChatFromWAChatUseCase(
			chatsRepository,
			contactsRepository,
			createContactFromWAContactUseCase,
		)
	})

	it('should be able to create chat from wa chat', async () => {
		const waChat = makeWAPrivateChat()

		const response = await sut.execute({ waChat })

		expect(response.isSuccess()).toBe(true)
		expect(chatsRepository.items).toHaveLength(1)
		expect(contactsRepository.items).toHaveLength(1)
	})

	it('should be able to create chat from wa chat with an existing contact', async () => {
		const waChat = makeWAPrivateChat()
		const contact = makeContact({
			instanceId: waChat.contact.instanceId,
			waContactId: waChat.contact.id,
		})

		contactsRepository.items.push(contact)

		const response = await sut.execute({ waChat })

		expect(response.isSuccess()).toBe(true)
		expect(chatsRepository.items).toHaveLength(1)
		expect(contactsRepository.items).toHaveLength(1)
	})
})
