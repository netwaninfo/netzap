import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository'
import { FakeDateService } from '@/test/services/chat/fake-date-service'
import { FakeStorageService } from '@/test/services/chat/fake-storage-service'
import { CreateContactFromWAContactUseCase } from '../../contacts/create-contact-from-wa-contact-use-case'
import { CreateContactsFromWAContactsUseCase } from '../../contacts/create-contacts-from-wa-contacts-use-case'
import { CreateMessageFromWAMessageUseCase } from '../../messages/create-message-from-wa-message-use-case'
import { CreateMessageMediaFromWAMessageUseCase } from '../../messages/create-message-media-from-wa-message-use-case'
import { CreateGroupAudioMessageFromWAMessageUseCase } from '../../messages/group/create-group-audio-message-from-wa-message-use-case'
import { CreateGroupDocumentMessageFromWAMessageUseCase } from '../../messages/group/create-group-document-message-from-wa-message-use-case'
import { CreateGroupImageMessageFromWAMessageUseCase } from '../../messages/group/create-group-image-message-from-wa-message-use-case'
import { CreateGroupMessageFromWAMessageUseCase } from '../../messages/group/create-group-message-from-wa-message-use-case'
import { CreateGroupMultiVCardMessageFromWAMessageUseCase } from '../../messages/group/create-group-multi-card-message-from-wa-message-use-case'
import { CreateGroupRevokedMessageFromWAMessageUseCase } from '../../messages/group/create-group-revoked-message-from-wa-message-use-case'
import { CreateGroupTextMessageFromWAMessageUseCase } from '../../messages/group/create-group-text-message-from-wa-message-use-case'
import { CreateGroupUnknownMessageFromWAMessageUseCase } from '../../messages/group/create-group-unknown-message-from-wa-message-use-case'
import { CreateGroupVCardMessageFromWAMessageUseCase } from '../../messages/group/create-group-v-card-message-from-wa-message-use-case'
import { CreateGroupVideoMessageFromWAMessageUseCase } from '../../messages/group/create-group-video-message-from-wa-message-use-case'
import { CreateGroupVoiceMessageFromWAMessageUseCase } from '../../messages/group/create-group-voice-message-from-wa-message-use-case'
import { CreatePrivateAudioMessageFromWAMessageUseCase } from '../../messages/private/create-private-audio-message-from-wa-message-use-case'
import { CreatePrivateDocumentMessageFromWAMessageUseCase } from '../../messages/private/create-private-document-message-from-wa-message-use-case'
import { CreatePrivateImageMessageFromWAMessageUseCase } from '../../messages/private/create-private-image-message-from-wa-message-use-case'
import { CreatePrivateMessageFromWAMessageUseCase } from '../../messages/private/create-private-message-from-wa-message-use-case'
import { CreatePrivateMultiVCardMessageFromWAMessageUseCase } from '../../messages/private/create-private-multi-card-message-from-wa-message-use-case'
import { CreatePrivateRevokedMessageFromWAMessageUseCase } from '../../messages/private/create-private-revoked-message-from-wa-message-use-case'
import { CreatePrivateTextMessageFromWAMessageUseCase } from '../../messages/private/create-private-text-message-from-wa-message-use-case'
import { CreatePrivateUnknownMessageFromWAMessageUseCase } from '../../messages/private/create-private-unknown-message-from-wa-message-use-case'
import { CreatePrivateVCardMessageFromWAMessageUseCase } from '../../messages/private/create-private-v-card-message-from-wa-message-use-case'
import { CreatePrivateVideoMessageFromWAMessageUseCase } from '../../messages/private/create-private-video-message-from-wa-message-use-case'
import { CreatePrivateVoiceMessageFromWAMessageUseCase } from '../../messages/private/create-private-voice-message-from-wa-message-use-case'
import { LinkChatLastMessageFromWAMessageUseCase } from '../link-chat-last-message-from-wa-message-use-case'

describe('LinkChatLastMessageFromWAMessageUseCase', () => {
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

  let createGroupAudioMessageFromWAMessage: CreateGroupAudioMessageFromWAMessageUseCase
  let createGroupDocumentMessageFromWAMessage: CreateGroupDocumentMessageFromWAMessageUseCase
  let createGroupImageMessageFromWAMessage: CreateGroupImageMessageFromWAMessageUseCase

  let createGroupMultiVCardMessageFromWAMessage: CreateGroupMultiVCardMessageFromWAMessageUseCase
  let createGroupRevokedMessageFromWAMessage: CreateGroupRevokedMessageFromWAMessageUseCase
  let createGroupTextMessageFromWAMessage: CreateGroupTextMessageFromWAMessageUseCase
  let createGroupUnknownMessageFromWAMessage: CreateGroupUnknownMessageFromWAMessageUseCase

  let createGroupVCardMessageFromWAMessage: CreateGroupVCardMessageFromWAMessageUseCase

  let createGroupVideoMessageFromWAMessage: CreateGroupVideoMessageFromWAMessageUseCase
  let createGroupVoiceMessageFromWAMessage: CreateGroupVoiceMessageFromWAMessageUseCase

  let createGroupMessageFromWAMessage: CreateGroupMessageFromWAMessageUseCase
  let createPrivateMessageFromWAMessage: CreatePrivateMessageFromWAMessageUseCase

  let createMessageFromWAMessageUseCase: CreateMessageFromWAMessageUseCase

  let sut: LinkChatLastMessageFromWAMessageUseCase

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

    createPrivateMessageFromWAMessage =
      new CreatePrivateMessageFromWAMessageUseCase(
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

    createGroupAudioMessageFromWAMessage =
      new CreateGroupAudioMessageFromWAMessageUseCase(
        chatsRepository,
        contactsRepository,
        messagesRepository,
        createMessageMediaFromWAMessage,
        dateService
      )

    createGroupDocumentMessageFromWAMessage =
      new CreateGroupDocumentMessageFromWAMessageUseCase(
        chatsRepository,
        contactsRepository,
        messagesRepository,
        createMessageMediaFromWAMessage,
        dateService
      )

    createGroupImageMessageFromWAMessage =
      new CreateGroupImageMessageFromWAMessageUseCase(
        chatsRepository,
        contactsRepository,
        messagesRepository,
        createMessageMediaFromWAMessage,
        dateService
      )

    createContactsFromWAContactsUseCase =
      new CreateContactsFromWAContactsUseCase(contactsRepository)

    createGroupMultiVCardMessageFromWAMessage =
      new CreateGroupMultiVCardMessageFromWAMessageUseCase(
        chatsRepository,
        contactsRepository,
        messagesRepository,
        createContactsFromWAContactsUseCase,
        dateService
      )

    createGroupRevokedMessageFromWAMessage =
      new CreateGroupRevokedMessageFromWAMessageUseCase(
        chatsRepository,
        contactsRepository,
        messagesRepository,
        dateService
      )

    createGroupTextMessageFromWAMessage =
      new CreateGroupTextMessageFromWAMessageUseCase(
        chatsRepository,
        contactsRepository,
        messagesRepository,
        dateService
      )

    createGroupUnknownMessageFromWAMessage =
      new CreateGroupUnknownMessageFromWAMessageUseCase(
        chatsRepository,
        contactsRepository,
        messagesRepository,
        dateService
      )

    createGroupVCardMessageFromWAMessage =
      new CreateGroupVCardMessageFromWAMessageUseCase(
        chatsRepository,
        messagesRepository,
        contactsRepository,
        createContactFromWAContact,
        dateService
      )

    createGroupVideoMessageFromWAMessage =
      new CreateGroupVideoMessageFromWAMessageUseCase(
        chatsRepository,
        contactsRepository,
        messagesRepository,
        createMessageMediaFromWAMessage,
        dateService
      )

    createGroupVoiceMessageFromWAMessage =
      new CreateGroupVoiceMessageFromWAMessageUseCase(
        chatsRepository,
        contactsRepository,
        messagesRepository,
        createMessageMediaFromWAMessage,
        dateService
      )

    createGroupMessageFromWAMessage =
      new CreateGroupMessageFromWAMessageUseCase(
        contactsRepository,
        createContactFromWAContact,
        createGroupAudioMessageFromWAMessage,
        createGroupDocumentMessageFromWAMessage,
        createGroupImageMessageFromWAMessage,
        createGroupMultiVCardMessageFromWAMessage,
        createGroupRevokedMessageFromWAMessage,
        createGroupTextMessageFromWAMessage,
        createGroupUnknownMessageFromWAMessage,
        createGroupVCardMessageFromWAMessage,
        createGroupVideoMessageFromWAMessage,
        createGroupVoiceMessageFromWAMessage
      )

    createMessageFromWAMessageUseCase = new CreateMessageFromWAMessageUseCase(
      createPrivateMessageFromWAMessage,
      createGroupMessageFromWAMessage
    )

    sut = new LinkChatLastMessageFromWAMessageUseCase(
      chatsRepository,
      createMessageFromWAMessageUseCase
    )
  })

  it('should be able to create last message of chat from wa-message', async () => {
    const instanceId = makeUniqueEntityID()

    const chat = makePrivateChat({ instanceId, lastMessage: null })
    chatsRepository.items.push(chat)

    const waMessage = makeWAPrivateMessage({
      instanceId,
      waChatId: chat.waChatId,
    })

    const response = await sut.execute({
      chat,
      waMessage,
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    expect(messagesRepository.items).toHaveLength(1)
    expect(chat.hasLastMessage()).toBe(true)
  })

  it('should be able to create last message of chat from wa-message with quoted message', async () => {
    const instanceId = makeUniqueEntityID()

    const chat = makePrivateChat({ instanceId, lastMessage: null })
    chatsRepository.items.push(chat)

    const waMessage = makeWAPrivateMessage({
      instanceId,
      waChatId: chat.waChatId,
      quoted: makeWAPrivateMessage({ instanceId, waChatId: chat.waChatId }),
    })

    const spySut = vi.spyOn(sut, 'execute')
    const response = await sut.execute({
      chat,
      waMessage,
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    expect(messagesRepository.items).toHaveLength(2)
    expect(chat.hasLastMessage()).toBe(true)
    expect(spySut).toHaveBeenCalledTimes(2)
  })
})
