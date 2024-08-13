import type { Contact } from '@/domain/chat/enterprise/entities/contact'
import type { GroupChat } from '@/domain/chat/enterprise/entities/group/chat'
import { GroupMessage } from '@/domain/chat/enterprise/entities/group/message'
import { makeGroupChat } from '@/test/factories/chat/group/make-group-chat'
import { makeGroupVCardMessage } from '@/test/factories/chat/group/make-group-v-card-message'
import { makeContact } from '@/test/factories/chat/make-contact'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository'
import { FakeDateService } from '@/test/services/chat/fake-date-service'
import { CreateContactFromWAContactUseCase } from '../../contact/create-contact-from-wa-contact-use-case'
import { CreateGroupVCardMessageFromWAMessageUseCase } from '../create-group-v-card-message-from-wa-message-use-case'

describe('CreateGroupVCardMessageFromWAMessageUseCase', () => {
	let chatsRepository: InMemoryChatsRepository
	let contactsRepository: InMemoryContactsRepository
	let messagesRepository: InMemoryMessagesRepository

	let createContactFromWAContact: CreateContactFromWAContactUseCase

	let dateService: FakeDateService

	let sut: CreateGroupVCardMessageFromWAMessageUseCase

	let chat: GroupChat
	let author: Contact

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		contactsRepository = new InMemoryContactsRepository()
		messagesRepository = new InMemoryMessagesRepository()

		createContactFromWAContact = new CreateContactFromWAContactUseCase(
			contactsRepository,
		)

		dateService = new FakeDateService()

		sut = new CreateGroupVCardMessageFromWAMessageUseCase(
			chatsRepository,
			messagesRepository,
			contactsRepository,
			createContactFromWAContact,
			dateService,
		)

		chat = makeGroupChat()
		chatsRepository.items.push(chat)

		author = makeContact({ instanceId: chat.instanceId })
		contactsRepository.items.push(author)
	})

	it('should be able to create a group vcard message', async () => {
		const response = await sut.execute({
			waMessage: makeWAGroupMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'vcard',
				contacts: [
					makeWAPrivateContact({
						instanceId: chat.instanceId,
					}),
				],
				author: makeWAPrivateContact(
					{ instanceId: author.instanceId },
					author.waContactId,
				),
			}),
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		expect(messagesRepository.items).toHaveLength(1)
		expect(contactsRepository.items).toHaveLength(2)
	})

	it('should be able to create a group vcard message with existing contact', async () => {
		const contact = makeContact({ instanceId: chat.instanceId })
		contactsRepository.items.push(contact)

		const createContactFromWAContactMock = vi.spyOn(
			createContactFromWAContact,
			'execute',
		)

		const response = await sut.execute({
			waMessage: makeWAGroupMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'vcard',
				contacts: [
					makeWAPrivateContact(
						{ instanceId: contact.instanceId },
						contact.waContactId,
					),
				],
				author: makeWAPrivateContact(
					{ instanceId: author.instanceId },
					author.waContactId,
				),
			}),
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		expect(messagesRepository.items).toHaveLength(1)
		expect(contactsRepository.items).toHaveLength(2)
		expect(createContactFromWAContactMock).not.toHaveBeenCalled()
	})

	it('should be able to create a group vcard message quoting other message', async () => {
		const quotedMessage = makeGroupVCardMessage({
			chatId: chat.id,
			instanceId: chat.instanceId,
		})
		messagesRepository.items.push(quotedMessage)

		const response = await sut.execute({
			waMessage: makeWAGroupMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'vcard',
				contacts: [
					makeWAPrivateContact({
						instanceId: chat.instanceId,
					}),
				],
				author: makeWAPrivateContact(
					{ instanceId: author.instanceId },
					author.waContactId,
				),
				quoted: makeWAGroupMessage(
					{
						type: 'vcard',
						contacts: [makeWAPrivateContact({ instanceId: chat.instanceId })],
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

		expect(message.quoted).toBeInstanceOf(GroupMessage)
		expect(messagesRepository.items).toHaveLength(2)
	})
})
