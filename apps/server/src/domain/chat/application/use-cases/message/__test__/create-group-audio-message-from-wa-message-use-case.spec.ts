import type { Contact } from '@/domain/chat/enterprise/entities/contact'
import type { GroupChat } from '@/domain/chat/enterprise/entities/group/chat'
import { GroupMessage } from '@/domain/chat/enterprise/entities/group/message'
import { makeGroupAudioMessage } from '@/test/factories/chat/group/make-group-audio-message'
import { makeContact } from '@/test/factories/chat/make-contact'
import { makeGroupChat } from '@/test/factories/chat/make-group-chat'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository'
import { FakeDateService } from '@/test/services/chat/fake-date-service'
import { FakeStorageService } from '@/test/services/chat/fake-storage-service'
import { CreateGroupAudioMessageFromWAMessageUseCase } from '../create-group-audio-message-from-wa-message-use-case'
import { CreateMessageMediaFromWAMessageUseCase } from '../create-message-media-from-wa-message-use-case'

describe('CreateGroupAudioMessageFromWAMessageUseCase', () => {
	let chatsRepository: InMemoryChatsRepository
	let contactsRepository: InMemoryContactsRepository
	let messagesRepository: InMemoryMessagesRepository

	let storageService: FakeStorageService
	let createMessageMediaFromWAMessage: CreateMessageMediaFromWAMessageUseCase

	let dateService: FakeDateService

	let sut: CreateGroupAudioMessageFromWAMessageUseCase

	let chat: GroupChat
	let author: Contact

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		contactsRepository = new InMemoryContactsRepository()
		messagesRepository = new InMemoryMessagesRepository()

		storageService = new FakeStorageService()
		createMessageMediaFromWAMessage =
			new CreateMessageMediaFromWAMessageUseCase(storageService)

		dateService = new FakeDateService()

		sut = new CreateGroupAudioMessageFromWAMessageUseCase(
			chatsRepository,
			contactsRepository,
			messagesRepository,
			createMessageMediaFromWAMessage,
			dateService,
		)

		chat = makeGroupChat()
		chatsRepository.items.push(chat)

		author = makeContact({ instanceId: chat.instanceId })
		contactsRepository.items.push(author)
	})

	it('should be able to create a group audio message', async () => {
		const response = await sut.execute({
			waMessage: makeWAGroupMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'audio',
				media: makeWAMessageMedia(),
				author: makeWAPrivateContact(
					{ instanceId: author.instanceId },
					author.waContactId,
				),
			}),
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value

		expect(message.media).toBeTruthy()
		expect(messagesRepository.items).toHaveLength(1)
		expect(storageService.items).toHaveLength(1)
	})

	it('should be able to create a group audio message quoting other message', async () => {
		const quotedMessage = makeGroupAudioMessage({
			chatId: chat.id,
			instanceId: chat.instanceId,
		})
		messagesRepository.items.push(quotedMessage)

		const response = await sut.execute({
			waMessage: makeWAGroupMessage({
				instanceId: chat.instanceId,
				waChatId: chat.waChatId,
				type: 'audio',
				media: makeWAMessageMedia(),
				author: makeWAPrivateContact(
					{ instanceId: author.instanceId },
					author.waContactId,
				),
				quoted: makeWAGroupMessage(
					{
						type: 'audio',
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

		expect(message.media).toBeTruthy()
		expect(message.quoted).toBeInstanceOf(GroupMessage)
		expect(messagesRepository.items).toHaveLength(2)
		expect(storageService.items).toHaveLength(1)
	})
})
