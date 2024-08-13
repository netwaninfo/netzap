import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { HandleWAChatUnread } from '../handle-wa-chat-unread'

describe('HandleWAChatUnread', () => {
	let chatsRepository: InMemoryChatsRepository

	let sut: HandleWAChatUnread

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()

		sut = new HandleWAChatUnread(chatsRepository)
	})

	it('should be able to set chat unread', async () => {
		const privateChat = makePrivateChat()
		chatsRepository.items.push(privateChat)

		const response = await sut.execute({
			instanceId: privateChat.instanceId,
			waChatId: privateChat.waChatId,
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { chat } = response.value
		expect(chat.unreadCount).toBe(-1)
	})
})
