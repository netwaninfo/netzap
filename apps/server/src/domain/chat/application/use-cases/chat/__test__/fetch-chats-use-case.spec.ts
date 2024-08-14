import { makeGroupChat } from '@/test/factories/chat/group/make-group-chat'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { each } from '@/test/utilities/each'
import { FetchChatsUseCase } from '../fetch-chats-use-case'

describe('FetchChatsUseCase', () => {
	let chatsRepository: InMemoryChatsRepository

	let sut: FetchChatsUseCase

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()

		sut = new FetchChatsUseCase(chatsRepository)
	})

	it('should be able to fetch chats', async () => {
		const instanceId = makeUniqueEntityID()

		chatsRepository.items.push(
			...each(2).map(() => makePrivateChat({ instanceId })),
			makeGroupChat({ instanceId }),
		)

		const response = await sut.execute({
			instanceId,
			page: 1,
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { chats } = response.value
		expect(chats).toHaveLength(3)
	})
})
