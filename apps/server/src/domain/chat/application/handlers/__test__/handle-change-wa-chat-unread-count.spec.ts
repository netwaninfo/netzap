import { FakeChatEmitter } from '@/test/emitters/chat/fake-chat-emitter.js'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat.js'
import { makeWAPrivateChat } from '@/test/factories/chat/wa/make-wa-private-chat.js'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository.js'
import { HandleChangeWAChatUnreadCount } from '../handle-change-wa-chat-unread-count.js'

describe('HandleChangeWAChatUnreadCount', () => {
  let chatsRepository: InMemoryChatsRepository
  let chatEmitter: FakeChatEmitter

  let sut: HandleChangeWAChatUnreadCount

  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    chatEmitter = new FakeChatEmitter()

    sut = new HandleChangeWAChatUnreadCount(chatsRepository, chatEmitter)
  })

  it('should be able to set chat unread count', async () => {
    const waChat = makeWAPrivateChat()
    const privateChat = makePrivateChat({
      instanceId: waChat.instanceId,
      waChatId: waChat.id,
    })

    chatsRepository.items.push(privateChat)

    const response = await sut.execute({
      waChat,
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { chat } = response.value
    expect(chat.unreadCount).toBe(waChat.unreadCount)
    expect(chatEmitter.items).toHaveLength(1)
  })
})
