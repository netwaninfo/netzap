import { FakeChatEmitter } from '@/test/emitters/chat/fake-chat-emitter'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { HandleChatUnread } from '../handle-chat-unread'

describe('HandleChatUnread', () => {
	let chatsRepository: InMemoryChatsRepository
	let chatEmitter: FakeChatEmitter

	let sut: HandleChatUnread

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		chatEmitter = new FakeChatEmitter()

		sut = new HandleChatUnread(chatsRepository, chatEmitter)
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
		expect(chatEmitter.items).toHaveLength(1)
	})
})
