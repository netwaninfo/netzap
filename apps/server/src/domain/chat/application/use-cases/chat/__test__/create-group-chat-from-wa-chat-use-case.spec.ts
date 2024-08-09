import { makeGroup } from '@/test/factories/chat/make-group'
import { makeWAGroupChat } from '@/test/factories/chat/wa/make-wa-group-chat'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryGroupsRepository } from '@/test/repositories/chat/in-memory-groups-repository'
import { CreateGroupFromWAContactUseCase } from '../../group/create-group-from-wa-contact-use-case'
import { CreateGroupChatFromWAChatUseCase } from '../create-group-chat-from-wa-chat-use-case'

describe('CreateGroupChatFromWAChatUseCase', () => {
	let chatsRepository: InMemoryChatsRepository
	let groupsRepository: InMemoryGroupsRepository

	let createGroupFromWAContactUseCase: CreateGroupFromWAContactUseCase

	let sut: CreateGroupChatFromWAChatUseCase

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		groupsRepository = new InMemoryGroupsRepository()

		createGroupFromWAContactUseCase = new CreateGroupFromWAContactUseCase(
			groupsRepository,
		)

		sut = new CreateGroupChatFromWAChatUseCase(
			chatsRepository,
			groupsRepository,
			createGroupFromWAContactUseCase,
		)
	})

	it('should be able to create chat from wa chat', async () => {
		const waChat = makeWAGroupChat()

		const response = await sut.execute({ waChat })

		expect(response.isSuccess()).toBe(true)
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

		const response = await sut.execute({ waChat })

		expect(response.isSuccess()).toBe(true)
		expect(chatsRepository.items).toHaveLength(1)
		expect(groupsRepository.items).toHaveLength(1)
	})
})
