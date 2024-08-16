import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Attendant } from '@/domain/chat/enterprise/entities/attendant'
import { GroupChat } from '@/domain/chat/enterprise/entities/group/chat'
import { GroupTextMessage } from '@/domain/chat/enterprise/entities/group/text-message'
import { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat'
import { PrivateTextMessage } from '@/domain/chat/enterprise/entities/private/text-message'
import { makeGroupChat } from '@/test/factories/chat/group/make-group-chat'
import { makeAttendant } from '@/test/factories/chat/make-attendant'
import { makeContact } from '@/test/factories/chat/make-contact'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { InMemoryAttendantsRepository } from '@/test/repositories/chat/in-memory-attendants-repository'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository'
import { FakeDateService } from '@/test/services/chat/fake-date-service'
import { FakeWhatsAppService } from '@/test/services/chat/fake-whats-app-service'
import { CreateTextMessageFromWAMessageUseCase } from '../../use-cases/message/create-text-message-from-wa-message-use-case'
import { CreateGroupTextMessageFromWAMessageUseCase } from '../../use-cases/message/group/create-group-text-message-from-wa-message-use-case'
import { CreatePrivateTextMessageFromWAMessageUseCase } from '../../use-cases/message/private/create-private-text-message-from-wa-message-use-case'
import { HandleSendTextMessage } from '../handle-send-text-message'

describe('HandleSendTextMessage', () => {
	let chatsRepository: InMemoryChatsRepository
	let messagesRepository: InMemoryMessagesRepository
	let attendantsRepository: InMemoryAttendantsRepository
	let dateService: FakeDateService

	let createPrivateTextMessageFromWAMessage: CreatePrivateTextMessageFromWAMessageUseCase

	let contactsRepository: InMemoryContactsRepository
	let createGroupTextMessageFromWAMessage: CreateGroupTextMessageFromWAMessageUseCase

	let createTextMessageFromWAMessage: CreateTextMessageFromWAMessageUseCase

	let whatsAppService: FakeWhatsAppService

	let sut: HandleSendTextMessage

	let instanceId: UniqueEntityID
	let attendant: Attendant

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		messagesRepository = new InMemoryMessagesRepository()
		attendantsRepository = new InMemoryAttendantsRepository()
		dateService = new FakeDateService()

		createPrivateTextMessageFromWAMessage =
			new CreatePrivateTextMessageFromWAMessageUseCase(
				chatsRepository,
				messagesRepository,
				attendantsRepository,
				dateService,
			)

		contactsRepository = new InMemoryContactsRepository()
		createGroupTextMessageFromWAMessage =
			new CreateGroupTextMessageFromWAMessageUseCase(
				chatsRepository,
				contactsRepository,
				messagesRepository,
				attendantsRepository,
				dateService,
			)

		createTextMessageFromWAMessage = new CreateTextMessageFromWAMessageUseCase(
			createPrivateTextMessageFromWAMessage,
			createGroupTextMessageFromWAMessage,
		)

		whatsAppService = new FakeWhatsAppService()

		sut = new HandleSendTextMessage(
			chatsRepository,
			createTextMessageFromWAMessage,
			whatsAppService,
		)

		instanceId = makeUniqueEntityID()
		attendant = makeAttendant({ instanceId })
		attendantsRepository.items.push(attendant)
	})

	it('should be able to send text message to private chat', async () => {
		whatsAppService.sendTextMessage = async (params) => {
			return whatsAppService.sendPrivateTextMessage(params)
		}

		const privateChat = makePrivateChat({ instanceId })
		chatsRepository.items.push(privateChat)

		const response = await sut.execute({
			instanceId,
			attendantId: attendant.id,
			body: 'message',
			waChatId: privateChat.waChatId,
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message, chat } = response.value

		expect(messagesRepository.items).toHaveLength(1)
		expect(chat).toBeInstanceOf(PrivateChat)
		expect(chat.lastMessage).toBeTruthy()
		expect(message).toBeInstanceOf(PrivateTextMessage)
	})

	it('should be able to send text message to group chat', async () => {
		const author = makeContact({ instanceId })
		contactsRepository.items.push(author)

		whatsAppService.sendTextMessage = async (params) => {
			return makeWAGroupMessage({
				...params,
				author: makeWAPrivateContact({}, author.waContactId),
			})
		}

		const groupChat = makeGroupChat({
			instanceId,
		})
		chatsRepository.items.push(groupChat)

		const response = await sut.execute({
			instanceId,
			attendantId: attendant.id,
			body: 'message',
			waChatId: groupChat.waChatId,
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { message, chat } = response.value

		expect(messagesRepository.items).toHaveLength(1)
		expect(chat).toBeInstanceOf(GroupChat)
		expect(chat.lastMessage).toBeTruthy()
		expect(message).toBeInstanceOf(GroupTextMessage)
	})
})
