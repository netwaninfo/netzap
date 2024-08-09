import { PrivateMessage } from '@/domain/chat/enterprise/entities/private/message'
import { makeContact } from '@/test/factories/chat/make-contact'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat'
import { makePrivateVCardMessage } from '@/test/factories/chat/private/make-private-v-card-message'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository'
import { FakeDateService } from '@/test/services/chat/fake-date-service'
import { CreateContactFromWAContactUseCase } from '../../contact/create-contact-from-wa-contact-use-case'
import { CreatePrivateVCardMessageFromWAMessage } from '../create-private-v-card-message-from-wa-message'

describe('CreatePrivateVCardMessageFromWAMessage', () => {
	let chatsRepository: InMemoryChatsRepository
	let messagesRepository: InMemoryMessagesRepository
	let contactsRepository: InMemoryContactsRepository

	let createContactFromWAContact: CreateContactFromWAContactUseCase

	let dateService: FakeDateService

	let sut: CreatePrivateVCardMessageFromWAMessage

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		messagesRepository = new InMemoryMessagesRepository()
		contactsRepository = new InMemoryContactsRepository()

		createContactFromWAContact = new CreateContactFromWAContactUseCase(
			contactsRepository,
		)

		dateService = new FakeDateService()

		sut = new CreatePrivateVCardMessageFromWAMessage(
			chatsRepository,
			messagesRepository,
			contactsRepository,
			createContactFromWAContact,
			dateService,
		)
	})

	it('should be able to create a private vcard message', async () => {
		const chat = makePrivateChat()
		chatsRepository.items.push(chat)

		const response = await sut.execute({
			waMessage: makeWAPrivateMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'vcard',
				contacts: [makeWAPrivateContact({ instanceId: chat.instanceId })],
			}),
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		expect(messagesRepository.items).toHaveLength(1)
		expect(contactsRepository.items).toHaveLength(1)
	})

	it('should be able to create a private vcard message with existing contact', async () => {
		const chat = makePrivateChat()
		chatsRepository.items.push(chat)

		const contact = makeContact({ instanceId: chat.instanceId })
		contactsRepository.items.push(contact)

		const createContactFromWAContactMock = vi.spyOn(
			createContactFromWAContact,
			'execute',
		)

		const response = await sut.execute({
			waMessage: makeWAPrivateMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'vcard',
				contacts: [
					makeWAPrivateContact(
						{ instanceId: contact.instanceId },
						contact.waContactId,
					),
				],
			}),
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		expect(messagesRepository.items).toHaveLength(1)
		expect(contactsRepository.items).toHaveLength(1)
		expect(createContactFromWAContactMock).not.toHaveBeenCalled()
	})

	it('should be able to create a private vcard message quoting other message', async () => {
		const chat = makePrivateChat()
		chatsRepository.items.push(chat)

		const quotedMessage = makePrivateVCardMessage({
			chatId: chat.id,
			instanceId: chat.instanceId,
		})
		messagesRepository.items.push(quotedMessage)

		const response = await sut.execute({
			waMessage: makeWAPrivateMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'vcard',
				contacts: [makeWAPrivateContact({ instanceId: chat.instanceId })],
				quoted: makeWAPrivateMessage(
					{
						type: 'vcard',
						contacts: [makeWAPrivateContact()],
						instanceId: chat.instanceId,
						waChatId: chat.waChatId,
					},
					quotedMessage.waMessageId,
				),
			}),
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value

		expect(message.quoted).toBeInstanceOf(PrivateMessage)
		expect(messagesRepository.items).toHaveLength(2)
	})
})
