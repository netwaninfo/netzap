import { makeContact } from '@/test/factories/chat/make-contact'
import { makeWAPrivateChat } from '@/test/factories/chat/wa/make-wa-private-chat'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { CreateContactFromWAContact } from '../../contact/create-contact-from-wa-contact-use-case'
import { CreatePrivateChatFromWAChatUseCase } from '../create-private-chat-from-wa-chat-use-case'

describe('CreatePrivateChatFromWAChatUseCase', () => {
	let chatsRepository: InMemoryChatsRepository
	let contactsRepository: InMemoryContactsRepository

	let createContactFromWAContact: CreateContactFromWAContact

	let sut: CreatePrivateChatFromWAChatUseCase

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		contactsRepository = new InMemoryContactsRepository()

		createContactFromWAContact = new CreateContactFromWAContact(
			contactsRepository,
		)

		sut = new CreatePrivateChatFromWAChatUseCase(
			chatsRepository,
			contactsRepository,
			createContactFromWAContact,
		)
	})

	it('should be able to create chat from wa chat', async () => {
		const waChat = makeWAPrivateChat()

		const result = await sut.execute({ waChat })

		expect(result.isSuccess()).toBe(true)
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

		const result = await sut.execute({ waChat })

		expect(result.isSuccess()).toBe(true)
		expect(chatsRepository.items).toHaveLength(1)
		expect(contactsRepository.items).toHaveLength(1)
	})
})
