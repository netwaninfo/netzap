import { PrivateAudioMessage } from '@/domain/chat/enterprise/entities/private/audio-message'
import type { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat'
import { PrivateDocumentMessage } from '@/domain/chat/enterprise/entities/private/document-message'
import { PrivateImageMessage } from '@/domain/chat/enterprise/entities/private/image-message'
import { PrivateMultiVCardMessage } from '@/domain/chat/enterprise/entities/private/multi-v-card-message'
import { PrivateRevokedMessage } from '@/domain/chat/enterprise/entities/private/revoked-message'
import { PrivateTextMessage } from '@/domain/chat/enterprise/entities/private/text-message'
import { PrivateUnknownMessage } from '@/domain/chat/enterprise/entities/private/unknown-message'
import { PrivateVCardMessage } from '@/domain/chat/enterprise/entities/private/v-card-message'
import { PrivateVideoMessage } from '@/domain/chat/enterprise/entities/private/video-message'
import { PrivateVoiceMessage } from '@/domain/chat/enterprise/entities/private/voice-message'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository'
import { FakeDateService } from '@/test/services/chat/fake-date-service'
import { FakeStorageService } from '@/test/services/chat/fake-storage-service'
import { CreateContactFromWAContactUseCase } from '../../contact/create-contact-from-wa-contact-use-case'
import { CreateContactsFromWAContactsUseCase } from '../../contact/create-contacts-from-wa-contacts-use-case'
import { CreatePrivateAudioMessageFromWAMessage } from '../create-private-audio-message-from-wa-message'
import { CreatePrivateDocumentMessageFromWAMessage } from '../create-private-document-message-from-wa-message'
import { CreatePrivateImageMessageFromWAMessage } from '../create-private-image-message-from-wa-message'
import { CreatePrivateMessageFromWAMessage } from '../create-private-message-from-wa-message-use-case'
import { CreatePrivateMultiVCardMessageFromWAMessage } from '../create-private-multi-card-message-from-wa-message'
import { CreatePrivateRevokedMessageFromWAMessage } from '../create-private-revoked-message-from-wa-message'
import { CreatePrivateTextMessageFromWAMessage } from '../create-private-text-message-from-wa-message'
import { CreatePrivateUnknownMessageFromWAMessage } from '../create-private-unknown-message-from-wa-message'
import { CreatePrivateVCardMessageFromWAMessage } from '../create-private-v-card-message-from-wa-message'
import { CreatePrivateVideoMessageFromWAMessage } from '../create-private-video-message-from-wa-message'
import { CreatePrivateVoiceMessageFromWAMessage } from '../create-private-voice-message-from-wa-message'

describe('CreatePrivateMessageFromWAMessage', () => {
	let chatsRepository: InMemoryChatsRepository
	let messagesRepository: InMemoryMessagesRepository
	let storageService: FakeStorageService
	let dateService: FakeDateService

	let createPrivateAudioMessageFromWAMessage: CreatePrivateAudioMessageFromWAMessage
	let createPrivateDocumentMessageFromWAMessage: CreatePrivateDocumentMessageFromWAMessage
	let createPrivateImageMessageFromWAMessage: CreatePrivateImageMessageFromWAMessage

	let contactsRepository: InMemoryContactsRepository
	let createContactsFromWAContactsUseCase: CreateContactsFromWAContactsUseCase

	let createPrivateMultiVCardMessageFromWAMessage: CreatePrivateMultiVCardMessageFromWAMessage
	let createPrivateRevokedMessageFromWAMessage: CreatePrivateRevokedMessageFromWAMessage
	let createPrivateTextMessageFromWAMessage: CreatePrivateTextMessageFromWAMessage
	let createPrivateUnknownMessageFromWAMessage: CreatePrivateUnknownMessageFromWAMessage

	let createContactFromWAContact: CreateContactFromWAContactUseCase
	let createPrivateVCardMessageFromWAMessage: CreatePrivateVCardMessageFromWAMessage

	let createPrivateVideoMessageFromWAMessage: CreatePrivateVideoMessageFromWAMessage
	let createPrivateVoiceMessageFromWAMessage: CreatePrivateVoiceMessageFromWAMessage

	let sut: CreatePrivateMessageFromWAMessage
	let chat: PrivateChat

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		messagesRepository = new InMemoryMessagesRepository()
		storageService = new FakeStorageService()
		dateService = new FakeDateService()

		createPrivateAudioMessageFromWAMessage =
			new CreatePrivateAudioMessageFromWAMessage(
				chatsRepository,
				messagesRepository,
				storageService,
				dateService,
			)

		createPrivateDocumentMessageFromWAMessage =
			new CreatePrivateDocumentMessageFromWAMessage(
				chatsRepository,
				messagesRepository,
				storageService,
				dateService,
			)

		createPrivateImageMessageFromWAMessage =
			new CreatePrivateImageMessageFromWAMessage(
				chatsRepository,
				messagesRepository,
				storageService,
				dateService,
			)

		contactsRepository = new InMemoryContactsRepository()
		createContactsFromWAContactsUseCase =
			new CreateContactsFromWAContactsUseCase(contactsRepository)

		createPrivateMultiVCardMessageFromWAMessage =
			new CreatePrivateMultiVCardMessageFromWAMessage(
				chatsRepository,
				messagesRepository,
				createContactsFromWAContactsUseCase,
				dateService,
			)

		createPrivateRevokedMessageFromWAMessage =
			new CreatePrivateRevokedMessageFromWAMessage(
				chatsRepository,
				messagesRepository,
				dateService,
			)

		createPrivateTextMessageFromWAMessage =
			new CreatePrivateTextMessageFromWAMessage(
				chatsRepository,
				messagesRepository,
				dateService,
			)

		createPrivateUnknownMessageFromWAMessage =
			new CreatePrivateUnknownMessageFromWAMessage(
				chatsRepository,
				messagesRepository,
				dateService,
			)

		createContactFromWAContact = new CreateContactFromWAContactUseCase(
			contactsRepository,
		)

		createPrivateVCardMessageFromWAMessage =
			new CreatePrivateVCardMessageFromWAMessage(
				chatsRepository,
				messagesRepository,
				contactsRepository,
				createContactFromWAContact,
				dateService,
			)

		createPrivateVideoMessageFromWAMessage =
			new CreatePrivateVideoMessageFromWAMessage(
				chatsRepository,
				messagesRepository,
				storageService,
				dateService,
			)

		createPrivateVoiceMessageFromWAMessage =
			new CreatePrivateVoiceMessageFromWAMessage(
				chatsRepository,
				messagesRepository,
				storageService,
				dateService,
			)

		sut = new CreatePrivateMessageFromWAMessage(
			createPrivateAudioMessageFromWAMessage,
			createPrivateDocumentMessageFromWAMessage,
			createPrivateImageMessageFromWAMessage,
			createPrivateMultiVCardMessageFromWAMessage,
			createPrivateRevokedMessageFromWAMessage,
			createPrivateTextMessageFromWAMessage,
			createPrivateUnknownMessageFromWAMessage,
			createPrivateVCardMessageFromWAMessage,
			createPrivateVideoMessageFromWAMessage,
			createPrivateVoiceMessageFromWAMessage,
		)

		chat = makePrivateChat()
		chatsRepository.items.push(chat)
	})

	it('should be able to create a private audio message', async () => {
		const waMessage = makeWAPrivateMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'audio',
			media: makeWAMessageMedia(),
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(PrivateAudioMessage)
	})

	it('should be able to create a private document message', async () => {
		const waMessage = makeWAPrivateMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'document',
			media: makeWAMessageMedia(),
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(PrivateDocumentMessage)
	})

	it('should be able to create a private image message', async () => {
		const waMessage = makeWAPrivateMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'image',
			media: makeWAMessageMedia(),
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(PrivateImageMessage)
	})

	it('should be able to create a private multi vcard message', async () => {
		const waMessage = makeWAPrivateMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'multi_vcard',
			contacts: [makeWAPrivateContact({ instanceId: chat.instanceId })],
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(PrivateMultiVCardMessage)
	})

	it('should be able to create a private vcard message', async () => {
		const waMessage = makeWAPrivateMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'vcard',
			contacts: [makeWAPrivateContact({ instanceId: chat.instanceId })],
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(PrivateVCardMessage)
	})

	it('should be able to create a private revoked message', async () => {
		const waMessage = makeWAPrivateMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'revoked',
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(PrivateRevokedMessage)
	})

	it('should be able to create a private video message', async () => {
		const waMessage = makeWAPrivateMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'video',
			media: makeWAMessageMedia(),
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(PrivateVideoMessage)
	})

	it('should be able to create a private voice message', async () => {
		const waMessage = makeWAPrivateMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'voice',
			media: makeWAMessageMedia(),
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(PrivateVoiceMessage)
	})

	it('should be able to create a private text message', async () => {
		const waMessage = makeWAPrivateMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'text',
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(PrivateTextMessage)
	})

	it('should be able to create a private unknown message', async () => {
		const waMessage = makeWAPrivateMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'unknown',
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(PrivateUnknownMessage)
	})
})
