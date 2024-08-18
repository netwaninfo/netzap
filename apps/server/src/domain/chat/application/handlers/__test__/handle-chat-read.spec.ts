import { FakeChatEmitter } from '@/test/emitters/chat/fake-chat-emitter'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { HandleChatRead } from '../handle-chat-read'

describe('HandleChatRead', () => {
	let chatsRepository: InMemoryChatsRepository
	let chatEmitter: FakeChatEmitter

	let sut: HandleChatRead

	beforeEach(() => {
		chatsRepository = new InMemoryChatsRepository()
		chatEmitter = new FakeChatEmitter()

		sut = new HandleChatRead(chatsRepository, chatEmitter)
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
		expect(chatEmitter.items).toHaveLength(1)
	})
})
