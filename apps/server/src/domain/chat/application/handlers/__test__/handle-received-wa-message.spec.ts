import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GroupChat } from '@/domain/chat/enterprise/entities/group/chat'
import { GroupMessage } from '@/domain/chat/enterprise/entities/group/message'
import { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat'
import { PrivateMessage } from '@/domain/chat/enterprise/entities/private/message'
import { FakeChatEmitter } from '@/test/emitters/chat/fake-chat-emitter'
import { FakeMessageEmitter } from '@/test/emitters/chat/fake-message-emitter'
import { makeWAGroupChat } from '@/test/factories/chat/wa/make-wa-group-chat'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message'
import { makeWAPrivateChat } from '@/test/factories/chat/wa/make-wa-private-chat'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { InMemoryGroupsRepository } from '@/test/repositories/chat/in-memory-groups-repository'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository'
import { FakeDateService } from '@/test/services/chat/fake-date-service'
import { FakeStorageService } from '@/test/services/chat/fake-storage-service'
import { CreateChatFromWAChatUseCase } from '../../use-cases/chat/create-chat-from-wa-chat-use-case'
import { CreateGroupChatFromWAChatUseCase } from '../../use-cases/chat/create-group-chat-from-wa-chat-use-case'
import { CreatePrivateChatFromWAChatUseCase } from '../../use-cases/chat/create-private-chat-from-wa-chat-use-case'
import { CreateContactFromWAContactUseCase } from '../../use-cases/contact/create-contact-from-wa-contact-use-case'
import { CreateContactsFromWAContactsUseCase } from '../../use-cases/contact/create-contacts-from-wa-contacts-use-case'
import { CreateGroupFromWAContactUseCase } from '../../use-cases/group/create-group-from-wa-contact-use-case'
import { CreateMessageFromWAMessageUseCase } from '../../use-cases/message/create-message-from-wa-message-use-case'
import { CreateMessageMediaFromWAMessageUseCase } from '../../use-cases/message/create-message-media-from-wa-message-use-case'
import { CreateGroupAudioMessageFromWAMessageUseCase } from '../../use-cases/message/group/create-group-audio-message-from-wa-message-use-case'
import { CreateGroupDocumentMessageFromWAMessageUseCase } from '../../use-cases/message/group/create-group-document-message-from-wa-message-use-case'
import { CreateGroupImageMessageFromWAMessageUseCase } from '../../use-cases/message/group/create-group-image-message-from-wa-message-use-case'
import { CreateGroupMessageFromWAMessageUseCase } from '../../use-cases/message/group/create-group-message-from-wa-message-use-case'
import { CreateGroupMultiVCardMessageFromWAMessageUseCase } from '../../use-cases/message/group/create-group-multi-card-message-from-wa-message-use-case'
import { CreateGroupRevokedMessageFromWAMessageUseCase } from '../../use-cases/message/group/create-group-revoked-message-from-wa-message-use-case'
import { CreateGroupTextMessageFromWAMessageUseCase } from '../../use-cases/message/group/create-group-text-message-from-wa-message-use-case'
import { CreateGroupUnknownMessageFromWAMessageUseCase } from '../../use-cases/message/group/create-group-unknown-message-from-wa-message-use-case'
import { CreateGroupVCardMessageFromWAMessageUseCase } from '../../use-cases/message/group/create-group-v-card-message-from-wa-message-use-case'
import { CreateGroupVideoMessageFromWAMessageUseCase } from '../../use-cases/message/group/create-group-video-message-from-wa-message-use-case'
import { CreateGroupVoiceMessageFromWAMessageUseCase } from '../../use-cases/message/group/create-group-voice-message-from-wa-message-use-case'
import { CreatePrivateAudioMessageFromWAMessageUseCase } from '../../use-cases/message/private/create-private-audio-message-from-wa-message-use-case'
import { CreatePrivateDocumentMessageFromWAMessageUseCase } from '../../use-cases/message/private/create-private-document-message-from-wa-message-use-case'
import { CreatePrivateImageMessageFromWAMessageUseCase } from '../../use-cases/message/private/create-private-image-message-from-wa-message-use-case'
import { CreatePrivateMessageFromWAMessageUseCase } from '../../use-cases/message/private/create-private-message-from-wa-message-use-case'
import { CreatePrivateMultiVCardMessageFromWAMessageUseCase } from '../../use-cases/message/private/create-private-multi-card-message-from-wa-message-use-case'
import { CreatePrivateRevokedMessageFromWAMessageUseCase } from '../../use-cases/message/private/create-private-revoked-message-from-wa-message-use-case'
import { CreatePrivateTextMessageFromWAMessageUseCase } from '../../use-cases/message/private/create-private-text-message-from-wa-message-use-case'
import { CreatePrivateUnknownMessageFromWAMessageUseCase } from '../../use-cases/message/private/create-private-unknown-message-from-wa-message-use-case'
import { CreatePrivateVCardMessageFromWAMessageUseCase } from '../../use-cases/message/private/create-private-v-card-message-from-wa-message-use-case'
import { CreatePrivateVideoMessageFromWAMessageUseCase } from '../../use-cases/message/private/create-private-video-message-from-wa-message-use-case'
import { CreatePrivateVoiceMessageFromWAMessageUseCase } from '../../use-cases/message/private/create-private-voice-message-from-wa-message-use-case'
import { HandleReceivedWAMessage } from '../handle-received-wa-message'

describe('HandleReceivedWAMessage', () => {
	let chatsRepository: InMemoryChatsRepository
	let groupsRepository: InMemoryGroupsRepository

	let createGroupFromWAContactUseCase: CreateGroupFromWAContactUseCase

	let contactsRepository: InMemoryContactsRepository

	let createContactsFromWAContacts: CreateContactsFromWAContactsUseCase

	let createGroupChatFromWAChatUseCase: CreateGroupChatFromWAChatUseCase

	let createContactFromWAContactUseCase: CreateContactFromWAContactUseCase

	let createPrivateChatFromWAChatUseCase: CreatePrivateChatFromWAChatUseCase

	let createChatFromWAChat: CreateChatFromWAChatUseCase

	let messagesRepository: InMemoryMessagesRepository

	let storageService: FakeStorageService
	let createMessageMediaFromWAMessage: CreateMessageMediaFromWAMessageUseCase

	let dateService: FakeDateService

	let createPrivateAudioMessageFromWAMessageUseCase: CreatePrivateAudioMessageFromWAMessageUseCase
	let createPrivateDocumentMessageFromWAMessageUseCase: CreatePrivateDocumentMessageFromWAMessageUseCase
	let createPrivateImageMessageFromWAMessageUseCase: CreatePrivateImageMessageFromWAMessageUseCase

	let createContactsFromWAContactsUseCase: CreateContactsFromWAContactsUseCase

	let createPrivateMultiVCardMessageFromWAMessageUseCase: CreatePrivateMultiVCardMessageFromWAMessageUseCase
	let createPrivateRevokedMessageFromWAMessageUseCase: CreatePrivateRevokedMessageFromWAMessageUseCase

	let createPrivateTextMessageFromWAMessageUseCase: CreatePrivateTextMessageFromWAMessageUseCase
	let createPrivateUnknownMessageFromWAMessageUseCase: CreatePrivateUnknownMessageFromWAMessageUseCase

	let createContactFromWAContact: CreateContactFromWAContactUseCase
	let createPrivateVCardMessageFromWAMessageUseCase: CreatePrivateVCardMessageFromWAMessageUseCase

	let createPrivateVideoMessageFromWAMessageUseCase: CreatePrivateVideoMessageFromWAMessageUseCase
	let createPrivateVoiceMessageFromWAMessageUseCase: CreatePrivateVoiceMessageFromWAMessageUseCase

	let createGroupAudioMessageFromWAMessage: CreateGroupAudioMessageFromWAMessageUseCase
	let createGroupDocumentMessageFromWAMessage: CreateGroupDocumentMessageFromWAMessageUseCase
	let createGroupImageMessageFromWAMessage: CreateGroupImageMessageFromWAMessageUseCase

	let createGroupMultiVCardMessageFromWAMessage: CreateGroupMultiVCardMessageFromWAMessageUseCase
	let createGroupRevokedMessageFromWAMessage: CreateGroupRevokedMessageFromWAMessageUseCase
	let createGroupTextMessageFromWAMessage: CreateGroupTextMessageFromWAMessageUseCase
	let createGroupUnknownMessageFromWAMessage: CreateGroupUnknownMessageFromWAMessageUseCase

	let createGroupVCardMessageFromWAMessage: CreateGroupVCardMessageFromWAMessageUseCase

	let createGroupVideoMessageFromWAMessage: CreateGroupVideoMessageFromWAMessageUseCase
	let createGroupVoiceMessageFromWAMessage: CreateGroupVoiceMessageFromWAMessageUseCase

	let createGroupMessageFromWAMessage: CreateGroupMessageFromWAMessageUseCase
	let createPrivateMessageFromWAMessage: CreatePrivateMessageFromWAMessageUseCase

	let createMessageFromWAMessage: CreateMessageFromWAMessageUseCase

	let messageEmitter: FakeMessageEmitter
	let chatEmitter: FakeChatEmitter

	let sut: HandleReceivedWAMessage

	let instanceId: UniqueEntityID

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		groupsRepository = new InMemoryGroupsRepository()

		createGroupFromWAContactUseCase = new CreateGroupFromWAContactUseCase(
			groupsRepository,
		)

		contactsRepository = new InMemoryContactsRepository()

		createContactsFromWAContacts = new CreateContactsFromWAContactsUseCase(
			contactsRepository,
		)

		createGroupChatFromWAChatUseCase = new CreateGroupChatFromWAChatUseCase(
			chatsRepository,
			groupsRepository,
			createGroupFromWAContactUseCase,
			createContactsFromWAContacts,
		)

		createContactFromWAContactUseCase = new CreateContactFromWAContactUseCase(
			contactsRepository,
		)

		createPrivateChatFromWAChatUseCase = new CreatePrivateChatFromWAChatUseCase(
			chatsRepository,
			contactsRepository,
			createContactFromWAContactUseCase,
		)

		createChatFromWAChat = new CreateChatFromWAChatUseCase(
			createGroupChatFromWAChatUseCase,
			createPrivateChatFromWAChatUseCase,
		)

		messagesRepository = new InMemoryMessagesRepository()

		storageService = new FakeStorageService()
		createMessageMediaFromWAMessage =
			new CreateMessageMediaFromWAMessageUseCase(storageService)

		dateService = new FakeDateService()

		createPrivateAudioMessageFromWAMessageUseCase =
			new CreatePrivateAudioMessageFromWAMessageUseCase(
				chatsRepository,
				messagesRepository,
				createMessageMediaFromWAMessage,
				dateService,
			)

		createPrivateDocumentMessageFromWAMessageUseCase =
			new CreatePrivateDocumentMessageFromWAMessageUseCase(
				chatsRepository,
				messagesRepository,
				createMessageMediaFromWAMessage,
				dateService,
			)

		createPrivateImageMessageFromWAMessageUseCase =
			new CreatePrivateImageMessageFromWAMessageUseCase(
				chatsRepository,
				messagesRepository,
				createMessageMediaFromWAMessage,
				dateService,
			)

		createContactsFromWAContactsUseCase =
			new CreateContactsFromWAContactsUseCase(contactsRepository)

		createPrivateMultiVCardMessageFromWAMessageUseCase =
			new CreatePrivateMultiVCardMessageFromWAMessageUseCase(
				chatsRepository,
				messagesRepository,
				createContactsFromWAContactsUseCase,
				dateService,
			)

		createPrivateRevokedMessageFromWAMessageUseCase =
			new CreatePrivateRevokedMessageFromWAMessageUseCase(
				chatsRepository,
				messagesRepository,
				dateService,
			)

		createPrivateTextMessageFromWAMessageUseCase =
			new CreatePrivateTextMessageFromWAMessageUseCase(
				chatsRepository,
				messagesRepository,
				dateService,
			)

		createPrivateUnknownMessageFromWAMessageUseCase =
			new CreatePrivateUnknownMessageFromWAMessageUseCase(
				chatsRepository,
				messagesRepository,
				dateService,
			)

		createContactFromWAContact = new CreateContactFromWAContactUseCase(
			contactsRepository,
		)

		createPrivateVCardMessageFromWAMessageUseCase =
			new CreatePrivateVCardMessageFromWAMessageUseCase(
				chatsRepository,
				messagesRepository,
				contactsRepository,
				createContactFromWAContact,
				dateService,
			)

		createPrivateVideoMessageFromWAMessageUseCase =
			new CreatePrivateVideoMessageFromWAMessageUseCase(
				chatsRepository,
				messagesRepository,
				createMessageMediaFromWAMessage,
				dateService,
			)

		createPrivateVoiceMessageFromWAMessageUseCase =
			new CreatePrivateVoiceMessageFromWAMessageUseCase(
				chatsRepository,
				messagesRepository,
				createMessageMediaFromWAMessage,
				dateService,
			)

		createPrivateMessageFromWAMessage =
			new CreatePrivateMessageFromWAMessageUseCase(
				createPrivateAudioMessageFromWAMessageUseCase,
				createPrivateDocumentMessageFromWAMessageUseCase,
				createPrivateImageMessageFromWAMessageUseCase,
				createPrivateMultiVCardMessageFromWAMessageUseCase,
				createPrivateRevokedMessageFromWAMessageUseCase,
				createPrivateTextMessageFromWAMessageUseCase,
				createPrivateUnknownMessageFromWAMessageUseCase,
				createPrivateVCardMessageFromWAMessageUseCase,
				createPrivateVideoMessageFromWAMessageUseCase,
				createPrivateVoiceMessageFromWAMessageUseCase,
			)

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
				createMessageMediaFromWAMessage,
				dateService,
			)

		createGroupVoiceMessageFromWAMessage =
			new CreateGroupVoiceMessageFromWAMessageUseCase(
				chatsRepository,
				contactsRepository,
				messagesRepository,
				createMessageMediaFromWAMessage,
				dateService,
			)

		createGroupMessageFromWAMessage =
			new CreateGroupMessageFromWAMessageUseCase(
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

		createMessageFromWAMessage = new CreateMessageFromWAMessageUseCase(
			createPrivateMessageFromWAMessage,
			createGroupMessageFromWAMessage,
		)

		messageEmitter = new FakeMessageEmitter()
		chatEmitter = new FakeChatEmitter()

		sut = new HandleReceivedWAMessage(
			chatsRepository,
			createChatFromWAChat,
			createMessageFromWAMessage,
			messageEmitter,
			chatEmitter,
		)

		instanceId = makeUniqueEntityID()
	})

	it('should be able to create a private chat and message', async () => {
		const waChat = makeWAPrivateChat({ instanceId })
		const waMessage = makeWAPrivateMessage({ instanceId, waChatId: waChat.id })

		const response = await sut.execute({
			waChat,
			waMessage,
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { chat, message } = response.value

		expect(message).toBeInstanceOf(PrivateMessage)

		expect(chat).toBeInstanceOf(PrivateChat)
		expect(chat.lastMessage).toBeInstanceOf(PrivateMessage)
		expect(messageEmitter.items).toHaveLength(1)
		expect(chatEmitter.items).toHaveLength(1)
	})

	it('should be able to create a group chat and message', async () => {
		const waChat = makeWAGroupChat({ instanceId })
		const waMessage = makeWAGroupMessage({
			instanceId,
			waChatId: waChat.id,
			author: makeWAPrivateContact({ instanceId }),
		})

		const response = await sut.execute({
			waChat,
			waMessage,
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { chat, message } = response.value

		expect(message).toBeInstanceOf(GroupMessage)

		expect(chat).toBeInstanceOf(GroupChat)
		expect(chat.lastMessage).toBeInstanceOf(GroupMessage)
		expect(messageEmitter.items).toHaveLength(1)
		expect(chatEmitter.items).toHaveLength(1)
	})
})
