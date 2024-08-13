import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { HandleWAChatRead } from '../handle-wa-chat-read'

describe('HandleWAChatRead', () => {
	let chatsRepository: InMemoryChatsRepository

	let sut: HandleWAChatRead

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()

		sut = new HandleWAChatRead(chatsRepository)
	})

	it('should be able to set chat read', async () => {
		const privateChat = makePrivateChat()
		chatsRepository.items.push(privateChat)

		const response = await sut.execute({
			instanceId: privateChat.instanceId,
			waChatId: privateChat.waChatId,
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { chat } = response.value
		expect(chat.unreadCount).toBe(0)
	})
})
