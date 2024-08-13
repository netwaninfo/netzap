import { GroupAudioMessage } from '@/domain/chat/enterprise/entities/group/audio-message'
import type { GroupChat } from '@/domain/chat/enterprise/entities/group/chat'
import { GroupDocumentMessage } from '@/domain/chat/enterprise/entities/group/document-message'
import { GroupImageMessage } from '@/domain/chat/enterprise/entities/group/image-message'
import { GroupMultiVCardMessage } from '@/domain/chat/enterprise/entities/group/multi-v-card-message'
import { GroupRevokedMessage } from '@/domain/chat/enterprise/entities/group/revoked-message'
import { GroupTextMessage } from '@/domain/chat/enterprise/entities/group/text-message'
import { GroupUnknownMessage } from '@/domain/chat/enterprise/entities/group/unknown-message'
import { GroupVCardMessage } from '@/domain/chat/enterprise/entities/group/v-card-message'
import { GroupVideoMessage } from '@/domain/chat/enterprise/entities/group/video-message'
import { GroupVoiceMessage } from '@/domain/chat/enterprise/entities/group/voice-message'
import { makeGroupChat } from '@/test/factories/chat/group/make-group-chat'
import { makeContact } from '@/test/factories/chat/make-contact'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository'
import { FakeDateService } from '@/test/services/chat/fake-date-service'
import { FakeStorageService } from '@/test/services/chat/fake-storage-service'
import { CreateContactFromWAContactUseCase } from '../../contact/create-contact-from-wa-contact-use-case'
import { CreateContactsFromWAContactsUseCase } from '../../contact/create-contacts-from-wa-contacts-use-case'
import { CreateGroupAudioMessageFromWAMessageUseCase } from '../create-group-audio-message-from-wa-message-use-case'
import { CreateGroupDocumentMessageFromWAMessageUseCase } from '../create-group-document-message-from-wa-message-use-case'
import { CreateGroupImageMessageFromWAMessageUseCase } from '../create-group-image-message-from-wa-message-use-case'
import { CreateGroupMessageFromWAMessageUseCase } from '../create-group-message-from-wa-message-use-case'
import { CreateGroupMultiVCardMessageFromWAMessageUseCase } from '../create-group-multi-card-message-from-wa-message-use-case'
import { CreateGroupRevokedMessageFromWAMessageUseCase } from '../create-group-revoked-message-from-wa-message-use-case'
import { CreateGroupTextMessageFromWAMessageUseCase } from '../create-group-text-message-from-wa-message-use-case'
import { CreateGroupUnknownMessageFromWAMessageUseCase } from '../create-group-unknown-message-from-wa-message-use-case'
import { CreateGroupVCardMessageFromWAMessageUseCase } from '../create-group-v-card-message-from-wa-message-use-case'
import { CreateGroupVideoMessageFromWAMessageUseCase } from '../create-group-video-message-from-wa-message-use-case'
import { CreateGroupVoiceMessageFromWAMessageUseCase } from '../create-group-voice-message-from-wa-message-use-case'
import { CreateMessageMediaFromWAMessageUseCase } from '../create-message-media-from-wa-message-use-case'

describe('CreateGroupMessageFromWAMessageUseCase', () => {
	let contactsRepository: InMemoryContactsRepository

	let createContactFromWAContact: CreateContactFromWAContactUseCase

	let chatsRepository: InMemoryChatsRepository
	let messagesRepository: InMemoryMessagesRepository

	let storageService: FakeStorageService
	let createMessageMediaFromWAMessage: CreateMessageMediaFromWAMessageUseCase

	let dateService: FakeDateService

	let createGroupAudioMessageFromWAMessage: CreateGroupAudioMessageFromWAMessageUseCase
	let createGroupDocumentMessageFromWAMessage: CreateGroupDocumentMessageFromWAMessageUseCase
	let createGroupImageMessageFromWAMessage: CreateGroupImageMessageFromWAMessageUseCase

	let createContactsFromWAContactsUseCase: CreateContactsFromWAContactsUseCase

	let createGroupMultiVCardMessageFromWAMessage: CreateGroupMultiVCardMessageFromWAMessageUseCase
	let createGroupRevokedMessageFromWAMessage: CreateGroupRevokedMessageFromWAMessageUseCase
	let createGroupTextMessageFromWAMessage: CreateGroupTextMessageFromWAMessageUseCase
	let createGroupUnknownMessageFromWAMessage: CreateGroupUnknownMessageFromWAMessageUseCase

	let createGroupVCardMessageFromWAMessage: CreateGroupVCardMessageFromWAMessageUseCase

	let createGroupVideoMessageFromWAMessage: CreateGroupVideoMessageFromWAMessageUseCase
	let createGroupVoiceMessageFromWAMessage: CreateGroupVoiceMessageFromWAMessageUseCase

	let sut: CreateGroupMessageFromWAMessageUseCase
	let chat: GroupChat

	beforeEach(() => {
		contactsRepository = new InMemoryContactsRepository()

		createContactFromWAContact = new CreateContactFromWAContactUseCase(
			contactsRepository,
		)

		chatsRepository = new InMemoryChatsRepository()
		messagesRepository = new InMemoryMessagesRepository()
		storageService = new FakeStorageService()

		storageService = new FakeStorageService()
		createMessageMediaFromWAMessage =
			new CreateMessageMediaFromWAMessageUseCase(storageService)

		dateService = new FakeDateService()

		createGroupAudioMessageFromWAMessage =
			new CreateGroupAudioMessageFromWAMessageUseCase(
				chatsRepository,
				contactsRepository,
				messagesRepository,
				createMessageMediaFromWAMessage,
				dateService,
			)

		createGroupDocumentMessageFromWAMessage =
			new CreateGroupDocumentMessageFromWAMessageUseCase(
				chatsRepository,
				contactsRepository,
				messagesRepository,
				createMessageMediaFromWAMessage,
				dateService,
			)

		createGroupImageMessageFromWAMessage =
			new CreateGroupImageMessageFromWAMessageUseCase(
				chatsRepository,
				contactsRepository,
				messagesRepository,
				createMessageMediaFromWAMessage,
				dateService,
			)

		createContactsFromWAContactsUseCase =
			new CreateContactsFromWAContactsUseCase(contactsRepository)

		createGroupMultiVCardMessageFromWAMessage =
			new CreateGroupMultiVCardMessageFromWAMessageUseCase(
				chatsRepository,
				contactsRepository,
				messagesRepository,
				createContactsFromWAContactsUseCase,
				dateService,
			)

		createGroupRevokedMessageFromWAMessage =
			new CreateGroupRevokedMessageFromWAMessageUseCase(
				chatsRepository,
				contactsRepository,
				messagesRepository,
				dateService,
			)

		createGroupTextMessageFromWAMessage =
			new CreateGroupTextMessageFromWAMessageUseCase(
				chatsRepository,
				contactsRepository,
				messagesRepository,
				dateService,
			)

		createGroupUnknownMessageFromWAMessage =
			new CreateGroupUnknownMessageFromWAMessageUseCase(
				chatsRepository,
				contactsRepository,
				messagesRepository,
				dateService,
			)

		createGroupVCardMessageFromWAMessage =
			new CreateGroupVCardMessageFromWAMessageUseCase(
				chatsRepository,
				messagesRepository,
				contactsRepository,
				createContactFromWAContact,
				dateService,
			)

		createGroupVideoMessageFromWAMessage =
			new CreateGroupVideoMessageFromWAMessageUseCase(
				chatsRepository,
				contactsRepository,
				messagesRepository,
				storageService,
				dateService,
			)

		createGroupVoiceMessageFromWAMessage =
			new CreateGroupVoiceMessageFromWAMessageUseCase(
				chatsRepository,
				contactsRepository,
				messagesRepository,
				storageService,
				dateService,
			)

		sut = new CreateGroupMessageFromWAMessageUseCase(
			contactsRepository,
			createContactFromWAContact,
			createGroupAudioMessageFromWAMessage,
			createGroupDocumentMessageFromWAMessage,
			createGroupImageMessageFromWAMessage,
			createGroupMultiVCardMessageFromWAMessage,
			createGroupRevokedMessageFromWAMessage,
			createGroupTextMessageFromWAMessage,
			createGroupUnknownMessageFromWAMessage,
			createGroupVCardMessageFromWAMessage,
			createGroupVideoMessageFromWAMessage,
			createGroupVoiceMessageFromWAMessage,
		)

		chat = makeGroupChat()
		chatsRepository.items.push(chat)
	})

	it('should be able to create a group audio message', async () => {
		const waMessage = makeWAGroupMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'audio',
			media: makeWAMessageMedia(),
			author: makeWAPrivateContact({ instanceId: chat.instanceId }),
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(GroupAudioMessage)
	})

	it('should be able to create a group document message', async () => {
		const author = makeContact({ instanceId: chat.instanceId })
		contactsRepository.items.push(author)

		const waMessage = makeWAGroupMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'document',
			media: makeWAMessageMedia(),
			author: makeWAPrivateContact(
				{ instanceId: author.instanceId },
				author.waContactId,
			),
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(GroupDocumentMessage)
	})

	it('should be able to create a group image message', async () => {
		const author = makeContact({ instanceId: chat.instanceId })
		contactsRepository.items.push(author)

		const waMessage = makeWAGroupMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'image',
			media: makeWAMessageMedia(),
			author: makeWAPrivateContact(
				{ instanceId: author.instanceId },
				author.waContactId,
			),
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(GroupImageMessage)
	})

	it('should be able to create a group multi vcard message', async () => {
		const author = makeContact({ instanceId: chat.instanceId })
		contactsRepository.items.push(author)

		const waMessage = makeWAGroupMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'multi_vcard',
			contacts: [
				makeWAPrivateContact({
					instanceId: chat.instanceId,
				}),
			],
			author: makeWAPrivateContact(
				{ instanceId: author.instanceId },
				author.waContactId,
			),
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(GroupMultiVCardMessage)
	})

	it('should be able to create a group vcard message', async () => {
		const author = makeContact({ instanceId: chat.instanceId })
		contactsRepository.items.push(author)

		const waMessage = makeWAGroupMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
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
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(GroupVCardMessage)
	})

	it('should be able to create a group revoked message', async () => {
		const author = makeContact({ instanceId: chat.instanceId })
		contactsRepository.items.push(author)

		const waMessage = makeWAGroupMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'revoked',
			author: makeWAPrivateContact(
				{ instanceId: author.instanceId },
				author.waContactId,
			),
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(GroupRevokedMessage)
	})

	it('should be able to create a group video message', async () => {
		const author = makeContact({ instanceId: chat.instanceId })
		contactsRepository.items.push(author)

		const waMessage = makeWAGroupMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'video',
			media: makeWAMessageMedia(),
			author: makeWAPrivateContact(
				{ instanceId: author.instanceId },
				author.waContactId,
			),
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(GroupVideoMessage)
	})

	it('should be able to create a group voice message', async () => {
		const author = makeContact({ instanceId: chat.instanceId })
		contactsRepository.items.push(author)

		const waMessage = makeWAGroupMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'voice',
			media: makeWAMessageMedia(),
			author: makeWAPrivateContact(
				{ instanceId: author.instanceId },
				author.waContactId,
			),
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(GroupVoiceMessage)
	})

	it('should be able to create a group text message', async () => {
		const author = makeContact({ instanceId: chat.instanceId })
		contactsRepository.items.push(author)

		const waMessage = makeWAGroupMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'text',
			author: makeWAPrivateContact(
				{ instanceId: author.instanceId },
				author.waContactId,
			),
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(GroupTextMessage)
	})

	it('should be able to create a group unknown message', async () => {
		const author = makeContact({ instanceId: chat.instanceId })
		contactsRepository.items.push(author)

		const waMessage = makeWAGroupMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'unknown',
			author: makeWAPrivateContact(
				{ instanceId: author.instanceId },
				author.waContactId,
			),
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(GroupUnknownMessage)
	})
})
