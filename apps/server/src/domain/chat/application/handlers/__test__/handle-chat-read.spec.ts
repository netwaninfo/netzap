import { FakeChatEmitter } from '@/test/emitters/chat/fake-chat-emitter.js'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat.js'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository.js'
import { FakeWhatsAppService } from '@/test/services/chat/fake-whats-app-service.js'
import { HandleChatRead } from '../handle-chat-read.js'

describe('HandleChatRead', () => {
  let chatsRepository: InMemoryChatsRepository
  let whatsAppService: FakeWhatsAppService
  let chatEmitter: FakeChatEmitter

  let sut: HandleChatRead

  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    whatsAppService = new FakeWhatsAppService()
    chatEmitter = new FakeChatEmitter()

    sut = new HandleChatRead(chatsRepository, whatsAppService, chatEmitter)
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
    expect(whatsAppService.chatsSeen).toHaveLength(1)
  })
})
