import { GroupMessage } from '@/domain/chat/enterprise/entities/group/message'
import { PrivateMessage } from '@/domain/chat/enterprise/entities/private/message'
import { makeGroupChat } from '@/test/factories/chat/group/make-group-chat'
import { makeContact } from '@/test/factories/chat/make-contact'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message'
import { InMemoryAttendantsRepository } from '@/test/repositories/chat/in-memory-attendants-repository'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository'
import { FakeDateService } from '@/test/services/chat/fake-date-service'
import { FakeStorageService } from '@/test/services/chat/fake-storage-service'
import { CreateContactFromWAContactUseCase } from '../../contact/create-contact-from-wa-contact-use-case'
import { CreateContactsFromWAContactsUseCase } from '../../contact/create-contacts-from-wa-contacts-use-case'
import { CreateMessageFromWAMessageUseCase } from '../create-message-from-wa-message-use-case'
import { CreateMessageMediaFromWAMessageUseCase } from '../create-message-media-from-wa-message-use-case'
import { CreateGroupAudioMessageFromWAMessageUseCase } from '../group/create-group-audio-message-from-wa-message-use-case'
import { CreateGroupDocumentMessageFromWAMessageUseCase } from '../group/create-group-document-message-from-wa-message-use-case'
import { CreateGroupImageMessageFromWAMessageUseCase } from '../group/create-group-image-message-from-wa-message-use-case'
import { CreateGroupMessageFromWAMessageUseCase } from '../group/create-group-message-from-wa-message-use-case'
import { CreateGroupMultiVCardMessageFromWAMessageUseCase } from '../group/create-group-multi-card-message-from-wa-message-use-case'
import { CreateGroupRevokedMessageFromWAMessageUseCase } from '../group/create-group-revoked-message-from-wa-message-use-case'
import { CreateGroupTextMessageFromWAMessageUseCase } from '../group/create-group-text-message-from-wa-message-use-case'
import { CreateGroupUnknownMessageFromWAMessageUseCase } from '../group/create-group-unknown-message-from-wa-message-use-case'
import { CreateGroupVCardMessageFromWAMessageUseCase } from '../group/create-group-v-card-message-from-wa-message-use-case'
import { CreateGroupVideoMessageFromWAMessageUseCase } from '../group/create-group-video-message-from-wa-message-use-case'
import { CreateGroupVoiceMessageFromWAMessageUseCase } from '../group/create-group-voice-message-from-wa-message-use-case'
import { CreatePrivateAudioMessageFromWAMessageUseCase } from '../private/create-private-audio-message-from-wa-message-use-case'
import { CreatePrivateDocumentMessageFromWAMessageUseCase } from '../private/create-private-document-message-from-wa-message-use-case'
import { CreatePrivateImageMessageFromWAMessageUseCase } from '../private/create-private-image-message-from-wa-message-use-case'
import { CreatePrivateMessageFromWAMessageUseCase } from '../private/create-private-message-from-wa-message-use-case'
import { CreatePrivateMultiVCardMessageFromWAMessageUseCase } from '../private/create-private-multi-card-message-from-wa-message-use-case'
import { CreatePrivateRevokedMessageFromWAMessageUseCase } from '../private/create-private-revoked-message-from-wa-message-use-case'
import { CreatePrivateTextMessageFromWAMessageUseCase } from '../private/create-private-text-message-from-wa-message-use-case'
import { CreatePrivateUnknownMessageFromWAMessageUseCase } from '../private/create-private-unknown-message-from-wa-message-use-case'
import { CreatePrivateVCardMessageFromWAMessageUseCase } from '../private/create-private-v-card-message-from-wa-message-use-case'
import { CreatePrivateVideoMessageFromWAMessageUseCase } from '../private/create-private-video-message-from-wa-message-use-case'
import { CreatePrivateVoiceMessageFromWAMessageUseCase } from '../private/create-private-voice-message-from-wa-message-use-case'

describe('CreateMessageFromWAMessageUseCase', () => {
	let chatsRepository: InMemoryChatsRepository
	let messagesRepository: InMemoryMessagesRepository

	let storageService: FakeStorageService
	let createMessageMediaFromWAMessage: CreateMessageMediaFromWAMessageUseCase

	let dateService: FakeDateService

	let createPrivateAudioMessageFromWAMessageUseCase: CreatePrivateAudioMessageFromWAMessageUseCase
	let createPrivateDocumentMessageFromWAMessageUseCase: CreatePrivateDocumentMessageFromWAMessageUseCase
	let createPrivateImageMessageFromWAMessageUseCase: CreatePrivateImageMessageFromWAMessageUseCase

	let contactsRepository: InMemoryContactsRepository
	let createContactsFromWAContactsUseCase: CreateContactsFromWAContactsUseCase

	let createPrivateMultiVCardMessageFromWAMessageUseCase: CreatePrivateMultiVCardMessageFromWAMessageUseCase
	let createPrivateRevokedMessageFromWAMessageUseCase: CreatePrivateRevokedMessageFromWAMessageUseCase

	let attendantsRepository: InMemoryAttendantsRepository

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

	let sut: CreateMessageFromWAMessageUseCase

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
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

		contactsRepository = new InMemoryContactsRepository()
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

		attendantsRepository = new InMemoryAttendantsRepository()

		createPrivateTextMessageFromWAMessageUseCase =
			new CreatePrivateTextMessageFromWAMessageUseCase(
				chatsRepository,
				messagesRepository,
				attendantsRepository,
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
				attendantsRepository,
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

		sut = new CreateMessageFromWAMessageUseCase(
			createPrivateMessageFromWAMessage,
			createGroupMessageFromWAMessage,
		)
	})

	it('should be able to create a private message', async () => {
		const chat = makePrivateChat()
		chatsRepository.items.push(chat)

		const waMessage = makeWAPrivateMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'text',
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(PrivateMessage)
	})

	it('should be able to create a group message', async () => {
		const chat = makeGroupChat()
		chatsRepository.items.push(chat)

		const author = makeContact({ instanceId: chat.instanceId })
		contactsRepository.items.push(author)

		const waMessage = makeWAGroupMessage({
			waChatId: chat.waChatId,
			instanceId: chat.instanceId,
			type: 'text',
			author: makeWAPrivateContact(
				{ instanceId: chat.instanceId },
				author.waContactId,
			),
		})

		const response = await sut.execute({ waMessage })
		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message } = response.value
		expect(message).instanceOf(GroupMessage)
	})
})
