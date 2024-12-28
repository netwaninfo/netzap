import { PrivateAudioMessage } from '@/domain/chat/enterprise/entities/private/audio-message.js'
import type { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat.js'
import { PrivateDocumentMessage } from '@/domain/chat/enterprise/entities/private/document-message.js'
import { PrivateImageMessage } from '@/domain/chat/enterprise/entities/private/image-message.js'
import { PrivateMultiVCardMessage } from '@/domain/chat/enterprise/entities/private/multi-v-card-message.js'
import { PrivateRevokedMessage } from '@/domain/chat/enterprise/entities/private/revoked-message.js'
import { PrivateTextMessage } from '@/domain/chat/enterprise/entities/private/text-message.js'
import { PrivateUnknownMessage } from '@/domain/chat/enterprise/entities/private/unknown-message.js'
import { PrivateVCardMessage } from '@/domain/chat/enterprise/entities/private/v-card-message.js'
import { PrivateVideoMessage } from '@/domain/chat/enterprise/entities/private/video-message.js'
import { PrivateVoiceMessage } from '@/domain/chat/enterprise/entities/private/voice-message.js'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat.js'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact.js'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message.js'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media.js'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository.js'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository.js'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository.js'
import { FakeDateService } from '@/test/services/chat/fake-date-service.js'
import { FakeStorageService } from '@/test/services/chat/fake-storage-service.js'
import { CreateContactFromWAContactUseCase } from '../../../contacts/create-contact-from-wa-contact-use-case.js'
import { CreateContactsFromWAContactsUseCase } from '../../../contacts/create-contacts-from-wa-contacts-use-case.js'
import { CreateMessageMediaFromWAMessageUseCase } from '../../create-message-media-from-wa-message-use-case.js'
import { CreatePrivateAudioMessageFromWAMessageUseCase } from '../create-private-audio-message-from-wa-message-use-case.js'
import { CreatePrivateDocumentMessageFromWAMessageUseCase } from '../create-private-document-message-from-wa-message-use-case.js'
import { CreatePrivateImageMessageFromWAMessageUseCase } from '../create-private-image-message-from-wa-message-use-case.js'
import { CreatePrivateMessageFromWAMessageUseCase } from '../create-private-message-from-wa-message-use-case.js'
import { CreatePrivateMultiVCardMessageFromWAMessageUseCase } from '../create-private-multi-card-message-from-wa-message-use-case.js'
import { CreatePrivateRevokedMessageFromWAMessageUseCase } from '../create-private-revoked-message-from-wa-message-use-case.js'
import { CreatePrivateTextMessageFromWAMessageUseCase } from '../create-private-text-message-from-wa-message-use-case.js'
import { CreatePrivateUnknownMessageFromWAMessageUseCase } from '../create-private-unknown-message-from-wa-message-use-case.js'
import { CreatePrivateVCardMessageFromWAMessageUseCase } from '../create-private-v-card-message-from-wa-message-use-case.js'
import { CreatePrivateVideoMessageFromWAMessageUseCase } from '../create-private-video-message-from-wa-message-use-case.js'
import { CreatePrivateVoiceMessageFromWAMessageUseCase } from '../create-private-voice-message-from-wa-message-use-case.js'

describe('CreatePrivateMessageFromWAMessageUseCase', () => {
  let chatsRepository: InMemoryChatsRepository
  let messagesRepository: InMemoryMessagesRepository

  let storageService: FakeStorageService
  let createMessageMediaFromWAMessage: CreateMessageMediaFromWAMessageUseCase

  let dateService: FakeDateService

  let createPrivateAudioMessageFromWAMessageUseCase: CreatePrivateAudioMessageFromWAMessageUseCase
  let createPrivateDocumentMessageFromWAMessageUseCase: CreatePrivateDocumentMessageFromWAMessageUseCase
  let createPrivateImageMessageFromWAMessageUseCase: CreatePrivateImageMessageFromWAMessageUseCase

  let contactsRepository: InMemoryContactsRepository
  let createContactsFromWAContactsUseCase: CreateContactsFromWAContactsUseCase

  let createPrivateMultiVCardMessageFromWAMessageUseCase: CreatePrivateMultiVCardMessageFromWAMessageUseCase
  let createPrivateRevokedMessageFromWAMessageUseCase: CreatePrivateRevokedMessageFromWAMessageUseCase

  let createPrivateTextMessageFromWAMessageUseCase: CreatePrivateTextMessageFromWAMessageUseCase
  let createPrivateUnknownMessageFromWAMessageUseCase: CreatePrivateUnknownMessageFromWAMessageUseCase

  let createContactFromWAContact: CreateContactFromWAContactUseCase
  let createPrivateVCardMessageFromWAMessageUseCase: CreatePrivateVCardMessageFromWAMessageUseCase

  let createPrivateVideoMessageFromWAMessageUseCase: CreatePrivateVideoMessageFromWAMessageUseCase
  let createPrivateVoiceMessageFromWAMessageUseCase: CreatePrivateVoiceMessageFromWAMessageUseCase

  let sut: CreatePrivateMessageFromWAMessageUseCase

  let chat: PrivateChat

  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    messagesRepository = new InMemoryMessagesRepository()

    storageService = new FakeStorageService()
    createMessageMediaFromWAMessage =
      new CreateMessageMediaFromWAMessageUseCase(storageService)

    dateService = new FakeDateService()

    createPrivateAudioMessageFromWAMessageUseCase =
      new CreatePrivateAudioMessageFromWAMessageUseCase(
        chatsRepository,
        messagesRepository,
        createMessageMediaFromWAMessage,
        dateService
      )

    createPrivateDocumentMessageFromWAMessageUseCase =
      new CreatePrivateDocumentMessageFromWAMessageUseCase(
        chatsRepository,
        messagesRepository,
        createMessageMediaFromWAMessage,
        dateService
      )

    createPrivateImageMessageFromWAMessageUseCase =
      new CreatePrivateImageMessageFromWAMessageUseCase(
        chatsRepository,
        messagesRepository,
        createMessageMediaFromWAMessage,
        dateService
      )

    contactsRepository = new InMemoryContactsRepository()
    createContactsFromWAContactsUseCase =
      new CreateContactsFromWAContactsUseCase(contactsRepository)

    createPrivateMultiVCardMessageFromWAMessageUseCase =
      new CreatePrivateMultiVCardMessageFromWAMessageUseCase(
        chatsRepository,
        messagesRepository,
        createContactsFromWAContactsUseCase,
        dateService
      )

    createPrivateRevokedMessageFromWAMessageUseCase =
      new CreatePrivateRevokedMessageFromWAMessageUseCase(
        chatsRepository,
        messagesRepository,
        dateService
      )

    createPrivateTextMessageFromWAMessageUseCase =
      new CreatePrivateTextMessageFromWAMessageUseCase(
        chatsRepository,
        messagesRepository,
        dateService
      )

    createPrivateUnknownMessageFromWAMessageUseCase =
      new CreatePrivateUnknownMessageFromWAMessageUseCase(
        chatsRepository,
        messagesRepository,
        dateService
      )

    createContactFromWAContact = new CreateContactFromWAContactUseCase(
      contactsRepository
    )

    createPrivateVCardMessageFromWAMessageUseCase =
      new CreatePrivateVCardMessageFromWAMessageUseCase(
        chatsRepository,
        messagesRepository,
        contactsRepository,
        createContactFromWAContact,
        dateService
      )

    createPrivateVideoMessageFromWAMessageUseCase =
      new CreatePrivateVideoMessageFromWAMessageUseCase(
        chatsRepository,
        messagesRepository,
        createMessageMediaFromWAMessage,
        dateService
      )

    createPrivateVoiceMessageFromWAMessageUseCase =
      new CreatePrivateVoiceMessageFromWAMessageUseCase(
        chatsRepository,
        messagesRepository,
        createMessageMediaFromWAMessage,
        dateService
      )

    sut = new CreatePrivateMessageFromWAMessageUseCase(
      createPrivateAudioMessageFromWAMessageUseCase,
      createPrivateDocumentMessageFromWAMessageUseCase,
      createPrivateImageMessageFromWAMessageUseCase,
      createPrivateMultiVCardMessageFromWAMessageUseCase,
      createPrivateRevokedMessageFromWAMessageUseCase,
      createPrivateTextMessageFromWAMessageUseCase,
      createPrivateUnknownMessageFromWAMessageUseCase,
      createPrivateVCardMessageFromWAMessageUseCase,
      createPrivateVideoMessageFromWAMessageUseCase,
      createPrivateVoiceMessageFromWAMessageUseCase
    )

    chat = makePrivateChat()
    chatsRepository.items.push(chat)
  })

  it('should be able to create a private audio message', async () => {
    const waMessage = makeWAPrivateMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'audio',
      media: makeWAMessageMedia(),
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(PrivateAudioMessage)
  })

  it('should be able to create a private document message', async () => {
    const waMessage = makeWAPrivateMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'document',
      media: makeWAMessageMedia(),
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(PrivateDocumentMessage)
  })

  it('should be able to create a private image message', async () => {
    const waMessage = makeWAPrivateMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'image',
      media: makeWAMessageMedia(),
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(PrivateImageMessage)
  })

  it('should be able to create a private multi vcard message', async () => {
    const waMessage = makeWAPrivateMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'multi_vcard',
      contacts: [makeWAPrivateContact({ instanceId: chat.instanceId })],
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(PrivateMultiVCardMessage)
  })

  it('should be able to create a private vcard message', async () => {
    const waMessage = makeWAPrivateMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'vcard',
      contacts: [makeWAPrivateContact({ instanceId: chat.instanceId })],
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(PrivateVCardMessage)
  })

  it('should be able to create a private revoked message', async () => {
    const waMessage = makeWAPrivateMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'revoked',
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(PrivateRevokedMessage)
  })

  it('should be able to create a private video message', async () => {
    const waMessage = makeWAPrivateMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'video',
      media: makeWAMessageMedia(),
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(PrivateVideoMessage)
  })

  it('should be able to create a private voice message', async () => {
    const waMessage = makeWAPrivateMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'voice',
      media: makeWAMessageMedia(),
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(PrivateVoiceMessage)
  })

  it('should be able to create a private text message', async () => {
    const waMessage = makeWAPrivateMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'text',
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(PrivateTextMessage)
  })

  it('should be able to create a private unknown message', async () => {
    const waMessage = makeWAPrivateMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'unknown',
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(PrivateUnknownMessage)
  })
})
