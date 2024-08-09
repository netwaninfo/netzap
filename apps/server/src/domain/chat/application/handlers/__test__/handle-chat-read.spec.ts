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

		const result = await sut.execute({
			instanceId: privateChat.instanceId,
			waChatId: privateChat.waChatId,
		})

		expect(result.isSuccess()).toBe(true)
		if (result.isFailure()) return

		const { chat } = result.value
		expect(chat.unreadCount).toBe(0)
	})
})
