import type { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat.js'
import { PrivateMessage } from '@/domain/chat/enterprise/entities/private/message.js'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat.js'
import { makePrivateVideoMessage } from '@/test/factories/chat/private/make-private-video-message.js'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message.js'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media.js'
import { faker } from '@/test/lib/faker.js'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository.js'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository.js'
import { FakeDateService } from '@/test/services/chat/fake-date-service.js'
import { FakeStorageService } from '@/test/services/chat/fake-storage-service.js'
import { CreateMessageMediaFromWAMessageUseCase } from '../../create-message-media-from-wa-message-use-case.js'
import { CreatePrivateVideoMessageFromWAMessageUseCase } from '../create-private-video-message-from-wa-message-use-case.js'

describe('CreatePrivateVideoMessageFromWAMessageUseCase', () => {
  let chatsRepository: InMemoryChatsRepository
  let messagesRepository: InMemoryMessagesRepository

  let storageService: FakeStorageService
  let createMessageMediaFromWAMessage: CreateMessageMediaFromWAMessageUseCase

  let dateService: FakeDateService

  let sut: CreatePrivateVideoMessageFromWAMessageUseCase

  let chat: PrivateChat

  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    messagesRepository = new InMemoryMessagesRepository()

    storageService = new FakeStorageService()
    createMessageMediaFromWAMessage =
      new CreateMessageMediaFromWAMessageUseCase(storageService)

    dateService = new FakeDateService()

    sut = new CreatePrivateVideoMessageFromWAMessageUseCase(
      chatsRepository,
      messagesRepository,
      createMessageMediaFromWAMessage,
      dateService
    )

    chat = makePrivateChat()
    chatsRepository.items.push(chat)
  })

  it('should be able to create a private video message', async () => {
    const response = await sut.execute({
      waMessage: makeWAPrivateMessage({
        instanceId: chat.instanceId,
        waChatId: chat.waChatId,
        type: 'video',
        media: makeWAMessageMedia(),
        body: faker.lorem.paragraph(),
      }),
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value

    expect(message.media).toBeTruthy()
    expect(message.body).toBeTruthy()
    expect(messagesRepository.items).toHaveLength(1)
    expect(storageService.items).toHaveLength(1)
  })

  it('should be able to create a private video message quoting other message', async () => {
    const quotedMessage = makePrivateVideoMessage({
      chatId: chat.id,
      instanceId: chat.instanceId,
    })
    messagesRepository.items.push(quotedMessage)

    const response = await sut.execute({
      waMessage: makeWAPrivateMessage({
        instanceId: chat.instanceId,
        waChatId: chat.waChatId,
        type: 'video',
        media: makeWAMessageMedia(),
        quoted: makeWAPrivateMessage(
          {
            type: 'video',
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

    expect(message.media).toBeTruthy()
    expect(message.quoted).toBeInstanceOf(PrivateMessage)
    expect(messagesRepository.items).toHaveLength(2)
    expect(storageService.items).toHaveLength(1)
  })
})
