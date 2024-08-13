import type { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat'
import { PrivateMessage } from '@/domain/chat/enterprise/entities/private/message'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat'
import { makePrivateUnknownMessage } from '@/test/factories/chat/private/make-private-unknown-message'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media'
import { faker } from '@/test/lib/faker'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository'
import { FakeDateService } from '@/test/services/chat/fake-date-service'
import { CreatePrivateUnknownMessageFromWAMessageUseCase } from '../create-private-unknown-message-from-wa-message-use-case'

describe('CreatePrivateUnknownMessageFromWAMessageUseCase', () => {
	let chatsRepository: InMemoryChatsRepository
	let messagesRepository: InMemoryMessagesRepository
	let dateService: FakeDateService

	let sut: CreatePrivateUnknownMessageFromWAMessageUseCase

	let chat: PrivateChat

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		messagesRepository = new InMemoryMessagesRepository()
		dateService = new FakeDateService()

		sut = new CreatePrivateUnknownMessageFromWAMessageUseCase(
			chatsRepository,
			messagesRepository,
			dateService,
		)

		chat = makePrivateChat()
		chatsRepository.items.push(chat)
	})

	it('should be able to create a private unknown message', async () => {
		const response = await sut.execute({
			waMessage: makeWAPrivateMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'unknown',
				media: makeWAMessageMedia(),
				body: faker.lorem.paragraph(),
			}),
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		expect(messagesRepository.items).toHaveLength(1)
	})

	it('should be able to create a private unknown message quoting other message', async () => {
		const quotedMessage = makePrivateUnknownMessage({
			chatId: chat.id,
			instanceId: chat.instanceId,
		})
		messagesRepository.items.push(quotedMessage)

		const response = await sut.execute({
			waMessage: makeWAPrivateMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'unknown',
				media: makeWAMessageMedia(),
				quoted: makeWAPrivateMessage(
					{
						type: 'unknown',
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
		expect(messagesRepository.items).toHaveLength(2)
	})
})
