import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GroupRevokedMessage } from '@/domain/chat/enterprise/entities/group/revoked-message'
import { PrivateRevokedMessage } from '@/domain/chat/enterprise/entities/private/revoked-message'
import type { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { makeGroupTextMessage } from '@/test/factories/chat/group/make-group-text-message'
import { makePrivateAudioMessage } from '@/test/factories/chat/private/make-private-audio-message'
import { makePrivateTextMessage } from '@/test/factories/chat/private/make-private-text-message'
import { makeStorageObject } from '@/test/factories/chat/value-objects/make-storage-object'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeWAGroupChat } from '@/test/factories/chat/wa/make-wa-group-chat'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message'
import { makeWAPrivateChat } from '@/test/factories/chat/wa/make-wa-private-chat'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository'
import { FakeDateService } from '@/test/services/chat/fake-date-service'
import { FakeStorageService } from '@/test/services/chat/fake-storage-service'
import dayjs from 'dayjs'
import { HandleRevokeWAMessage } from '../handle-revoke-wa-message'

describe('HandleRevokeWAMessage', () => {
	let messagesRepository: InMemoryMessagesRepository
	let dateService: FakeDateService
	let storageService: FakeStorageService

	let sut: HandleRevokeWAMessage

	let instanceId: UniqueEntityID
	let waChatId: WAEntityID

	beforeEach(() => {
		vi.useFakeTimers()

		messagesRepository = new InMemoryMessagesRepository()
		dateService = new FakeDateService()
		storageService = new FakeStorageService()

		sut = new HandleRevokeWAMessage(
			messagesRepository,
			dateService,
			storageService,
		)

		instanceId = makeUniqueEntityID()
		waChatId = makeWAEntityID()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should be able to revoke a private message from wa message revoked', async () => {
		const messageRef = makePrivateTextMessage({
			instanceId,
			waChatId,
		})
		messagesRepository.items.push(messageRef)

		const waChat = makeWAPrivateChat({ instanceId }, waChatId)
		const waRevokedMessage = makeWAPrivateMessage({
			instanceId,
			waChatId: waChat.id,
			type: 'text',
			timestamp: dayjs(messageRef.createdAt).unix(),
		})

		const response = await sut.execute({
			waRevokedMessage,
			waChat,
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value

		expect(messagesRepository.items[0]).toBeInstanceOf(PrivateRevokedMessage)
		expect(message).toBeInstanceOf(PrivateRevokedMessage)
	})

	it('should be able to revoke a group message from wa message revoked', async () => {
		const messageRef = makeGroupTextMessage({
			instanceId,
			waChatId,
		})
		messagesRepository.items.push(messageRef)

		const waChat = makeWAGroupChat({ instanceId }, waChatId)
		const waRevokedMessage = makeWAGroupMessage({
			instanceId,
			waChatId: waChat.id,
			type: 'text',
			timestamp: dayjs(messageRef.createdAt).unix(),
		})

		const response = await sut.execute({
			waRevokedMessage,
			waChat,
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value

		expect(messagesRepository.items[0]).toBeInstanceOf(GroupRevokedMessage)
		expect(message).toBeInstanceOf(GroupRevokedMessage)
	})

	it('should be able to revoke a message with media from wa message revoked', async () => {
		const messageRef = makePrivateAudioMessage({
			instanceId,
			waChatId,
		})
		messagesRepository.items.push(messageRef)

		const storageObject = makeStorageObject({ path: messageRef.media.key })
		storageService.items.push(storageObject)

		const waChat = makeWAPrivateChat({ instanceId }, waChatId)
		const waRevokedMessage = makeWAPrivateMessage({
			instanceId,
			waChatId: waChat.id,
			type: 'audio',
			timestamp: dayjs(messageRef.createdAt).unix(),
			media: makeWAMessageMedia(),
		})

		const storageServiceMock = vi.spyOn(storageService, 'delete')

		const response = await sut.execute({
			waRevokedMessage,
			waChat,
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		expect(storageService.items).toHaveLength(0)
		expect(storageServiceMock).toHaveBeenCalled()
	})
})
