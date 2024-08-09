import { PrivateMessage } from '@/domain/chat/enterprise/entities/private/message'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat'
import { makePrivateVideoMessage } from '@/test/factories/chat/private/make-private-video-message'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository'
import { FakeDateService } from '@/test/services/chat/fake-date-service'
import { FakeStorageService } from '@/test/services/chat/fake-storage-service'
import { CreatePrivateVideoMessageFromWAMessage } from '../create-private-video-message-from-wa-message'

describe('CreatePrivateVideoMessageFromWAMessage', () => {
	let chatsRepository: InMemoryChatsRepository
	let messagesRepository: InMemoryMessagesRepository
	let storageService: FakeStorageService
	let dateService: FakeDateService

	let sut: CreatePrivateVideoMessageFromWAMessage

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		messagesRepository = new InMemoryMessagesRepository()
		storageService = new FakeStorageService()
		dateService = new FakeDateService()

		sut = new CreatePrivateVideoMessageFromWAMessage(
			chatsRepository,
			messagesRepository,
			storageService,
			dateService,
		)
	})

	it('should be able to create a private video message', async () => {
		const chat = makePrivateChat()
		chatsRepository.items.push(chat)

		const result = await sut.execute({
			waMessage: makeWAPrivateMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'video',
				media: makeWAMessageMedia(),
			}),
		})

		expect(result.isSuccess()).toBe(true)
		if (result.isFailure()) return

		const { message } = result.value

		expect(message.media).toBeTruthy()
		expect(messagesRepository.items).toHaveLength(1)
		expect(storageService.items).toHaveLength(1)
	})

	it('should be able to create a private video message quoting other message', async () => {
		const chat = makePrivateChat()
		chatsRepository.items.push(chat)

		const quotedMessage = makePrivateVideoMessage({
			chatId: chat.id,
			instanceId: chat.instanceId,
		})
		messagesRepository.items.push(quotedMessage)

		const result = await sut.execute({
			waMessage: makeWAPrivateMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'video',
				media: makeWAMessageMedia(),
				quoted: makeWAPrivateMessage(
					{
						type: 'video',
						media: makeWAMessageMedia(),
						instanceId: chat.instanceId,
						waChatId: chat.waChatId,
					},
					quotedMessage.waMessageId,
				),
			}),
		})

		expect(result.isSuccess()).toBe(true)
		if (result.isFailure()) return

		const { message } = result.value

		expect(message.media).toBeTruthy()
		expect(message.quoted).toBeInstanceOf(PrivateMessage)
		expect(messagesRepository.items).toHaveLength(2)
		expect(storageService.items).toHaveLength(1)
	})
})
