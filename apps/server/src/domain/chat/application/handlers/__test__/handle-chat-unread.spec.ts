import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { HandleChatUnread } from '../handle-chat-unread'

describe('HandleChatUnread', () => {
	let chatsRepository: InMemoryChatsRepository

	let sut: HandleChatUnread

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()

		sut = new HandleChatUnread(chatsRepository)
	})

	it('should be able to set chat unread', async () => {
		const privateChat = makePrivateChat()
		chatsRepository.items.push(privateChat)

		const result = await sut.execute({
			instanceId: privateChat.instanceId,
			waChatId: privateChat.waChatId,
		})

		expect(result.isSuccess()).toBe(true)
		if (result.isFailure()) return

		const { chat } = result.value
		expect(chat.unreadCount).toBe(-1)
	})
})
