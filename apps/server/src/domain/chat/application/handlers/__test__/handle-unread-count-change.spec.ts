import { makePrivateChat } from '@/test/factories/chat/make-private-chat'
import { makeWAGroupChat } from '@/test/factories/chat/wa/make-wa-group-chat'
import { makeWAPrivateChat } from '@/test/factories/chat/wa/make-wa-private-chat'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { InMemoryGroupsRepository } from '@/test/repositories/chat/in-memory-groups-repository'
import { CreateChatFromWAChatUseCase } from '../../use-cases/chat/create-chat-from-wa-chat-use-case'
import { CreateGroupChatFromWAChatUseCase } from '../../use-cases/chat/create-group-chat-from-wa-chat-use-case'
import { CreatePrivateChatFromWAChatUseCase } from '../../use-cases/chat/create-private-chat-from-wa-chat-use-case'
import { CreateContactFromWAContact } from '../../use-cases/contact/create-contact-from-wa-contact-use-case'
import { CreateGroupFromWAContact } from '../../use-cases/group/create-group-from-wa-contact-use-case'
import { HandleUnreadCountChange } from '../handle-unread-count-change'

describe('HandleUnreadCountChange', () => {
	let chatsRepository: InMemoryChatsRepository
	let groupsRepository: InMemoryGroupsRepository

	let createGroupFromWAContact: CreateGroupFromWAContact

	let createGroupChatFromWAChatUseCase: CreateGroupChatFromWAChatUseCase

	let contactsRepository: InMemoryContactsRepository

	let createContactFromWAContact: CreateContactFromWAContact

	let createPrivateChatFromWAChatUseCase: CreatePrivateChatFromWAChatUseCase

	let createChatFromWAChatUseCase: CreateChatFromWAChatUseCase

	let sut: HandleUnreadCountChange

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		groupsRepository = new InMemoryGroupsRepository()

		createGroupFromWAContact = new CreateGroupFromWAContact(groupsRepository)

		createGroupChatFromWAChatUseCase = new CreateGroupChatFromWAChatUseCase(
			chatsRepository,
			groupsRepository,
			createGroupFromWAContact,
		)

		contactsRepository = new InMemoryContactsRepository()

		createContactFromWAContact = new CreateContactFromWAContact(
			contactsRepository,
		)

		createPrivateChatFromWAChatUseCase = new CreatePrivateChatFromWAChatUseCase(
			chatsRepository,
			contactsRepository,
			createContactFromWAContact,
		)

		createChatFromWAChatUseCase = new CreateChatFromWAChatUseCase(
			createGroupChatFromWAChatUseCase,
			createPrivateChatFromWAChatUseCase,
		)

		sut = new HandleUnreadCountChange(
			chatsRepository,
			createChatFromWAChatUseCase,
		)
	})

	it('should be able to change unread count', async () => {
		const waChat = makeWAPrivateChat({ unreadCount: 10 })
		const privateChat = makePrivateChat({
			waChatId: waChat.id,
			instanceId: waChat.instanceId,
		})
		chatsRepository.items.push(privateChat)

		const result = await sut.execute({ waChat })

		expect(result.isSuccess()).toBe(true)
		if (result.isFailure()) return

		const { chat } = result.value
		expect(chat.unreadCount).toBe(10)
	})

	it('should be able to create change and change unread count', async () => {
		const waChat = makeWAGroupChat({ unreadCount: 10 })

		const result = await sut.execute({ waChat })

		expect(result.isSuccess()).toBe(true)
		if (result.isFailure()) return

		const { chat } = result.value
		expect(chat.unreadCount).toBe(10)
	})
})
