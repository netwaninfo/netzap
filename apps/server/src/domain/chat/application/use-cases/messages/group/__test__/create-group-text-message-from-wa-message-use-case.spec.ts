import type { Contact } from '@/domain/chat/enterprise/entities/contact'
import type { GroupChat } from '@/domain/chat/enterprise/entities/group/chat'
import { GroupMessage } from '@/domain/chat/enterprise/entities/group/message'
import { makeGroupChat } from '@/test/factories/chat/group/make-group-chat'
import { makeGroupTextMessage } from '@/test/factories/chat/group/make-group-text-message'
import { makeContact } from '@/test/factories/chat/make-contact'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { faker } from '@/test/lib/faker'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository'
import { FakeDateService } from '@/test/services/chat/fake-date-service'
import { CreateGroupTextMessageFromWAMessageUseCase } from '../create-group-text-message-from-wa-message-use-case'

describe('CreateGroupTextMessageFromWAMessageUseCase', () => {
	let chatsRepository: InMemoryChatsRepository
	let contactsRepository: InMemoryContactsRepository
	let messagesRepository: InMemoryMessagesRepository
	let dateService: FakeDateService

	let sut: CreateGroupTextMessageFromWAMessageUseCase

	let chat: GroupChat
	let author: Contact

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		contactsRepository = new InMemoryContactsRepository()
		messagesRepository = new InMemoryMessagesRepository()
		dateService = new FakeDateService()

		sut = new CreateGroupTextMessageFromWAMessageUseCase(
			chatsRepository,
			contactsRepository,
			messagesRepository,
			dateService,
		)

		chat = makeGroupChat()
		chatsRepository.items.push(chat)

		author = makeContact({ instanceId: chat.instanceId })
		contactsRepository.items.push(author)
	})

	it('should be able to create a group text message', async () => {
		const response = await sut.execute({
			waMessage: makeWAGroupMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'text',
				body: faker.lorem.paragraph(),
				author: makeWAPrivateContact(
					{ instanceId: author.instanceId },
					author.waContactId,
				),
			}),
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value

		expect(message.body).toBeTruthy()
		expect(messagesRepository.items).toHaveLength(1)
	})

	it('should be able to create a group text message quoting other message', async () => {
		const quotedMessage = makeGroupTextMessage({
			chatId: chat.id,
			instanceId: chat.instanceId,
		})
		messagesRepository.items.push(quotedMessage)

		const response = await sut.execute({
			waMessage: makeWAGroupMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'text',
				media: makeWAMessageMedia(),
				author: makeWAPrivateContact(
					{ instanceId: author.instanceId },
					author.waContactId,
				),
				quoted: makeWAGroupMessage(
					{
						type: 'text',
						media: makeWAMessageMedia(),
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
		expect(message.body).toBeTruthy()
		expect(messagesRepository.items).toHaveLength(2)
	})

	it('should be able to create a group text message sent by attendant', async () => {
		const response = await sut.execute({
			waMessage: makeWAGroupMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'text',
				author: makeWAPrivateContact(
					{ instanceId: author.instanceId },
					author.waContactId,
				),
			}),
			attendantId: makeUniqueEntityID(),
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value

		expect(message.body).toBeTruthy()
		expect(message.sentBy).toBeTruthy()
		expect(messagesRepository.items).toHaveLength(1)
	})
})
