import { makeGroup } from '@/test/factories/chat/make-group'
import { makeWAGroupChat } from '@/test/factories/chat/wa/make-wa-group-chat'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryGroupsRepository } from '@/test/repositories/chat/in-memory-groups-repository'
import { CreateGroupFromWAContact } from '../../group/create-group-from-wa-contact-use-case'
import { CreateGroupChatFromWAChatUseCase } from '../create-group-chat-from-wa-chat-use-case'

describe('CreateGroupChatFromWAChatUseCase', () => {
	let chatsRepository: InMemoryChatsRepository
	let groupsRepository: InMemoryGroupsRepository

	let createGroupFromWAContact: CreateGroupFromWAContact

	let sut: CreateGroupChatFromWAChatUseCase

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		groupsRepository = new InMemoryGroupsRepository()

		createGroupFromWAContact = new CreateGroupFromWAContact(groupsRepository)

		sut = new CreateGroupChatFromWAChatUseCase(
			chatsRepository,
			groupsRepository,
			createGroupFromWAContact,
		)
	})

	it('should be able to create chat from wa chat', async () => {
		const waChat = makeWAGroupChat()

		const result = await sut.execute({ waChat })

		expect(result.isSuccess()).toBe(true)
		expect(chatsRepository.items).toHaveLength(1)
		expect(groupsRepository.items).toHaveLength(1)
	})

	it('should be able to create chat from wa chat with an existing group', async () => {
		const waChat = makeWAGroupChat()
		const group = makeGroup({
			instanceId: waChat.contact.instanceId,
			waGroupId: waChat.contact.id,
		})

		groupsRepository.items.push(group)

		const result = await sut.execute({ waChat })

		expect(result.isSuccess()).toBe(true)
		expect(chatsRepository.items).toHaveLength(1)
		expect(groupsRepository.items).toHaveLength(1)
	})
})
