import { GroupChat } from '@/domain/chat/enterprise/entities/group/chat'
import { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat'
import { makeWAGroupChat } from '@/test/factories/chat/wa/make-wa-group-chat'
import { makeWAPrivateChat } from '@/test/factories/chat/wa/make-wa-private-chat'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { InMemoryGroupsRepository } from '@/test/repositories/chat/in-memory-groups-repository'
import { CreateContactFromWAContactUseCase } from '../../contact/create-contact-from-wa-contact-use-case'
import { CreateGroupFromWAContactUseCase } from '../../group/create-group-from-wa-contact-use-case'
import { CreateChatFromWAChatUseCase } from '../create-chat-from-wa-chat-use-case'
import { CreateGroupChatFromWAChatUseCase } from '../create-group-chat-from-wa-chat-use-case'
import { CreatePrivateChatFromWAChatUseCase } from '../create-private-chat-from-wa-chat-use-case'

describe('CreateChatFromWAChatUseCase', () => {
	let chatsRepository: InMemoryChatsRepository
	let groupsRepository: InMemoryGroupsRepository

	let createGroupFromWAContactUseCase: CreateGroupFromWAContactUseCase

	let createGroupChatFromWAChatUseCase: CreateGroupChatFromWAChatUseCase

	let contactsRepository: InMemoryContactsRepository

	let createContactFromWAContactUseCase: CreateContactFromWAContactUseCase

	let createPrivateChatFromWAChatUseCase: CreatePrivateChatFromWAChatUseCase

	let sut: CreateChatFromWAChatUseCase

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		groupsRepository = new InMemoryGroupsRepository()

		createGroupFromWAContactUseCase = new CreateGroupFromWAContactUseCase(
			groupsRepository,
		)

		createGroupChatFromWAChatUseCase = new CreateGroupChatFromWAChatUseCase(
			chatsRepository,
			groupsRepository,
			createGroupFromWAContactUseCase,
		)

		contactsRepository = new InMemoryContactsRepository()

		createContactFromWAContactUseCase = new CreateContactFromWAContactUseCase(
			contactsRepository,
		)

		createPrivateChatFromWAChatUseCase = new CreatePrivateChatFromWAChatUseCase(
			chatsRepository,
			contactsRepository,
			createContactFromWAContactUseCase,
		)

		sut = new CreateChatFromWAChatUseCase(
			createGroupChatFromWAChatUseCase,
			createPrivateChatFromWAChatUseCase,
		)
	})

	it('should be able to create private chat from wa chat', async () => {
		const result = await sut.execute({
			waChat: makeWAPrivateChat(),
		})

		expect(result.isSuccess()).toBe(true)
		expect(chatsRepository.items).toHaveLength(1)
		expect(chatsRepository.items[0]).toBeInstanceOf(PrivateChat)
	})

	it('should be able to create group chat from wa chat', async () => {
		const result = await sut.execute({
			waChat: makeWAGroupChat(),
		})

		expect(result.isSuccess()).toBe(true)
		expect(chatsRepository.items).toHaveLength(1)
		expect(chatsRepository.items[0]).toBeInstanceOf(GroupChat)
	})
})
