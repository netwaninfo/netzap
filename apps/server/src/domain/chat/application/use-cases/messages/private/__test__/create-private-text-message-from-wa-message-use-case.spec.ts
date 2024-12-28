import type { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat.js'
import { PrivateMessage } from '@/domain/chat/enterprise/entities/private/message.js'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat.js'
import { makePrivateTextMessage } from '@/test/factories/chat/private/make-private-text-message.js'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message.js'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { faker } from '@/test/lib/faker.js'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository.js'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository.js'
import { FakeDateService } from '@/test/services/chat/fake-date-service.js'
import { CreatePrivateTextMessageFromWAMessageUseCase } from '../create-private-text-message-from-wa-message-use-case.js'

describe('CreatePrivateTextMessageFromWAMessageUseCase', () => {
  let chatsRepository: InMemoryChatsRepository
  let messagesRepository: InMemoryMessagesRepository
  let dateService: FakeDateService

  let sut: CreatePrivateTextMessageFromWAMessageUseCase

  let chat: PrivateChat

  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    messagesRepository = new InMemoryMessagesRepository()
    dateService = new FakeDateService()

    sut = new CreatePrivateTextMessageFromWAMessageUseCase(
      chatsRepository,
      messagesRepository,
      dateService
    )

    chat = makePrivateChat()
    chatsRepository.items.push(chat)
  })

  it('should be able to create a private text message', async () => {
    const response = await sut.execute({
      waMessage: makeWAPrivateMessage({
        instanceId: chat.instanceId,
        waChatId: chat.waChatId,
        type: 'text',
        body: faker.lorem.paragraph(),
      }),
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value

    expect(message.body).toBeTruthy()
    expect(messagesRepository.items).toHaveLength(1)
  })

  it('should be able to create a private text message quoting other message', async () => {
    const quotedMessage = makePrivateTextMessage({
      chatId: chat.id,
      instanceId: chat.instanceId,
    })
    messagesRepository.items.push(quotedMessage)

    const response = await sut.execute({
      waMessage: makeWAPrivateMessage({
        instanceId: chat.instanceId,
        waChatId: chat.waChatId,
        type: 'text',
        quoted: makeWAPrivateMessage(
          {
            type: 'text',
            media: makeWAMessageMedia(),
            instanceId: chat.instanceId,
            waChatId: chat.waChatId,
          },
          quotedMessage.waMessageId
        ),
      }),
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value

    expect(message.quoted).toBeInstanceOf(PrivateMessage)
    expect(message.body).toBeTruthy()
    expect(messagesRepository.items).toHaveLength(2)
  })

  it('should be able to create a private text message sent by attendant', async () => {
    const response = await sut.execute({
      waMessage: makeWAPrivateMessage({
        instanceId: chat.instanceId,
        waChatId: chat.waChatId,
        type: 'text',
      }),
      attendantId: makeUniqueEntityID(),
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value

    expect(message.body).toBeTruthy()
    expect(message.sentBy).toBeTruthy()
    expect(messagesRepository.items).toHaveLength(1)
  })
})
