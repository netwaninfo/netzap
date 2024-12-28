import type { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat.js'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat.js'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message.js'
import { faker } from '@/test/lib/faker.js'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository.js'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository.js'
import { FakeDateService } from '@/test/services/chat/fake-date-service.js'
import { CreatePrivateRevokedMessageFromWAMessageUseCase } from '../create-private-revoked-message-from-wa-message-use-case.js'

describe('CreatePrivateRevokedMessageFromWAMessageUseCase', () => {
  let chatsRepository: InMemoryChatsRepository
  let messagesRepository: InMemoryMessagesRepository
  let dateService: FakeDateService

  let sut: CreatePrivateRevokedMessageFromWAMessageUseCase

  let chat: PrivateChat

  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    messagesRepository = new InMemoryMessagesRepository()
    dateService = new FakeDateService()

    sut = new CreatePrivateRevokedMessageFromWAMessageUseCase(
      chatsRepository,
      messagesRepository,
      dateService
    )

    chat = makePrivateChat()
    chatsRepository.items.push(chat)
  })

  it('should be able to create a private revoked message', async () => {
    const response = await sut.execute({
      waMessage: makeWAPrivateMessage({
        instanceId: chat.instanceId,
        waChatId: chat.waChatId,
        type: 'revoked',
        body: faker.lorem.paragraph(),
      }),
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    expect(messagesRepository.items).toHaveLength(1)
  })
})
