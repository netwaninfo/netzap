import type { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat'
import { PrivateMessage } from '@/domain/chat/enterprise/entities/private/message'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat'
import { makePrivateVoiceMessage } from '@/test/factories/chat/private/make-private-voice-message'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository'
import { FakeDateService } from '@/test/services/chat/fake-date-service'
import { FakeStorageService } from '@/test/services/chat/fake-storage-service'
import { CreateMessageMediaFromWAMessageUseCase } from '../../create-message-media-from-wa-message-use-case'
import { CreatePrivateVoiceMessageFromWAMessageUseCase } from '../create-private-voice-message-from-wa-message-use-case'

describe('CreatePrivateVoiceMessageFromWAMessageUseCase', () => {
  let chatsRepository: InMemoryChatsRepository
  let messagesRepository: InMemoryMessagesRepository

  let storageService: FakeStorageService
  let createMessageMediaFromWAMessage: CreateMessageMediaFromWAMessageUseCase

  let dateService: FakeDateService

  let sut: CreatePrivateVoiceMessageFromWAMessageUseCase

  let chat: PrivateChat

  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    messagesRepository = new InMemoryMessagesRepository()

    storageService = new FakeStorageService()
    createMessageMediaFromWAMessage =
      new CreateMessageMediaFromWAMessageUseCase(storageService)

    dateService = new FakeDateService()

    sut = new CreatePrivateVoiceMessageFromWAMessageUseCase(
      chatsRepository,
      messagesRepository,
      createMessageMediaFromWAMessage,
      dateService
    )

    chat = makePrivateChat()
    chatsRepository.items.push(chat)
  })

  it('should be able to create a private voice message', async () => {
    const response = await sut.execute({
      waMessage: makeWAPrivateMessage({
        instanceId: chat.instanceId,
        waChatId: chat.waChatId,
        type: 'voice',
        media: makeWAMessageMedia(),
      }),
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value

    expect(message.media).toBeTruthy()
    expect(messagesRepository.items).toHaveLength(1)
    expect(storageService.items).toHaveLength(1)
  })

  it('should be able to create a private voice message quoting other message', async () => {
    const quotedMessage = makePrivateVoiceMessage({
      chatId: chat.id,
      instanceId: chat.instanceId,
    })
    messagesRepository.items.push(quotedMessage)

    const response = await sut.execute({
      waMessage: makeWAPrivateMessage({
        instanceId: chat.instanceId,
        waChatId: chat.waChatId,
        type: 'voice',
        media: makeWAMessageMedia(),
        quoted: makeWAPrivateMessage(
          {
            type: 'voice',
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
