import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { HandleChatRead } from '../handle-chat-read'

describe('HandleChatRead', () => {
	let chatsRepository: InMemoryChatsRepository

	let sut: HandleChatRead

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()

		sut = new HandleChatRead(chatsRepository)
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
