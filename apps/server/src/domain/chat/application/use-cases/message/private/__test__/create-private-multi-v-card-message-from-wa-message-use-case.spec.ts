import type { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat'
import { PrivateMessage } from '@/domain/chat/enterprise/entities/private/message'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat'
import { makePrivateMultiVCardMessage } from '@/test/factories/chat/private/make-private-multi-v-card-message'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository'
import { FakeDateService } from '@/test/services/chat/fake-date-service'
import { CreateContactsFromWAContactsUseCase } from '../../../contact/create-contacts-from-wa-contacts-use-case'
import { CreatePrivateMultiVCardMessageFromWAMessageUseCase } from '../create-private-multi-card-message-from-wa-message-use-case'

describe('CreatePrivateMultiVCardMessageFromWAMessageUseCase', () => {
	let chatsRepository: InMemoryChatsRepository
	let messagesRepository: InMemoryMessagesRepository
	let contactsRepository: InMemoryContactsRepository

	let createContactsFromWAContacts: CreateContactsFromWAContactsUseCase

	let dateService: FakeDateService

	let sut: CreatePrivateMultiVCardMessageFromWAMessageUseCase

	let chat: PrivateChat

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		messagesRepository = new InMemoryMessagesRepository()
		contactsRepository = new InMemoryContactsRepository()

		createContactsFromWAContacts = new CreateContactsFromWAContactsUseCase(
			contactsRepository,
		)

		dateService = new FakeDateService()

		sut = new CreatePrivateMultiVCardMessageFromWAMessageUseCase(
			chatsRepository,
			messagesRepository,
			createContactsFromWAContacts,
			dateService,
		)

		chat = makePrivateChat()
		chatsRepository.items.push(chat)
	})

	it('should be able to create a private multi vcard message', async () => {
		const response = await sut.execute({
			waMessage: makeWAPrivateMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'multi_vcard',
				contacts: [makeWAPrivateContact({ instanceId: chat.instanceId })],
			}),
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		expect(messagesRepository.items).toHaveLength(1)
		expect(contactsRepository.items).toHaveLength(1)
	})

	it('should be able to create a private vcard message quoting other message', async () => {
		const quotedMessage = makePrivateMultiVCardMessage({
			chatId: chat.id,
			instanceId: chat.instanceId,
		})
		messagesRepository.items.push(quotedMessage)

		const response = await sut.execute({
			waMessage: makeWAPrivateMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'multi_vcard',
				contacts: [makeWAPrivateContact({ instanceId: chat.instanceId })],
				quoted: makeWAPrivateMessage(
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

		expect(message.quoted).toBeInstanceOf(PrivateMessage)
		expect(messagesRepository.items).toHaveLength(2)
	})
})
