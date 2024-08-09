import { PrivateMessage } from '@/domain/chat/enterprise/entities/private/message'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat'
import { makePrivateTextMessage } from '@/test/factories/chat/private/make-private-text-message'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media'
import { faker } from '@/test/lib/faker'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository'
import { FakeDateService } from '@/test/services/chat/fake-date-service'
import { CreatePrivateTextMessageFromWAMessage } from '../create-private-text-message-from-wa-message'

describe('CreatePrivateTextMessageFromWAMessage', () => {
	let chatsRepository: InMemoryChatsRepository
	let messagesRepository: InMemoryMessagesRepository
	let dateService: FakeDateService

	let sut: CreatePrivateTextMessageFromWAMessage

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		messagesRepository = new InMemoryMessagesRepository()
		dateService = new FakeDateService()

		sut = new CreatePrivateTextMessageFromWAMessage(
			chatsRepository,
			messagesRepository,
			dateService,
		)
	})

	it('should be able to create a private text message', async () => {
		const chat = makePrivateChat()
		chatsRepository.items.push(chat)

		const response = await sut.execute({
			waMessage: makeWAPrivateMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'text',
				media: makeWAMessageMedia(),
				body: faker.lorem.paragraph(),
			}),
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value

		expect(message.body).toBeTruthy()
		expect(messagesRepository.items).toHaveLength(1)
	})

	it('should be able to create a private text message quoting other message', async () => {
		const chat = makePrivateChat()
		chatsRepository.items.push(chat)

		const quotedMessage = makePrivateTextMessage({
			chatId: chat.id,
			instanceId: chat.instanceId,
		})
		messagesRepository.items.push(quotedMessage)

		const response = await sut.execute({
			waMessage: makeWAPrivateMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'text',
				media: makeWAMessageMedia(),
				quoted: makeWAPrivateMessage(
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

		expect(message.quoted).toBeInstanceOf(PrivateMessage)
		expect(message.body).toBeTruthy()
		expect(messagesRepository.items).toHaveLength(2)
	})
})
