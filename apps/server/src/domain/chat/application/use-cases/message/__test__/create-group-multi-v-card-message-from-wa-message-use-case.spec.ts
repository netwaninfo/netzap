import { GroupMessage } from '@/domain/chat/enterprise/entities/group/message'
import { makeGroupChat } from '@/test/factories/chat/group/make-group-chat'
import { makeGroupMultiVCardMessage } from '@/test/factories/chat/group/make-group-multi-v-card-message'
import { makeContact } from '@/test/factories/chat/make-contact'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository'
import { FakeDateService } from '@/test/services/chat/fake-date-service'
import { CreateContactsFromWAContactsUseCase } from '../../contact/create-contacts-from-wa-contacts-use-case'
import { CreateGroupMultiVCardMessageFromWAMessageUseCase } from '../create-group-multi-card-message-from-wa-message-use-case'

describe('CreateGroupMultiVCardMessageFromWAMessageUseCase', () => {
	let chatsRepository: InMemoryChatsRepository
	let contactsRepository: InMemoryContactsRepository
	let messagesRepository: InMemoryMessagesRepository

	let createContactsFromWAContacts: CreateContactsFromWAContactsUseCase

	let dateService: FakeDateService

	let sut: CreateGroupMultiVCardMessageFromWAMessageUseCase

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		contactsRepository = new InMemoryContactsRepository()
		messagesRepository = new InMemoryMessagesRepository()

		createContactsFromWAContacts = new CreateContactsFromWAContactsUseCase(
			contactsRepository,
		)

		dateService = new FakeDateService()

		sut = new CreateGroupMultiVCardMessageFromWAMessageUseCase(
			chatsRepository,
			contactsRepository,
			messagesRepository,
			createContactsFromWAContacts,
			dateService,
		)
	})

	it('should be able to create a group multi vcard message', async () => {
		const chat = makeGroupChat()
		chatsRepository.items.push(chat)

		const author = makeContact({ instanceId: chat.instanceId })
		contactsRepository.items.push(author)

		const response = await sut.execute({
			waMessage: makeWAGroupMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'multi_vcard',
				contacts: [makeWAPrivateContact({ instanceId: chat.instanceId })],
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

	it('should be able to create a group vcard message quoting other message', async () => {
		const chat = makeGroupChat()
		chatsRepository.items.push(chat)

		const author = makeContact({ instanceId: chat.instanceId })
		contactsRepository.items.push(author)

		const quotedMessage = makeGroupMultiVCardMessage({
			chatId: chat.id,
			instanceId: chat.instanceId,
		})
		messagesRepository.items.push(quotedMessage)

		const response = await sut.execute({
			waMessage: makeWAGroupMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'multi_vcard',
				contacts: [makeWAPrivateContact({ instanceId: chat.instanceId })],
				author: makeWAPrivateContact(
					{ instanceId: author.instanceId },
					author.waContactId,
				),
				quoted: makeWAGroupMessage(
					{
						type: 'multi_vcard',
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
