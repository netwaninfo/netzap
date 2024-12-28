import type { Contact } from '@/domain/chat/enterprise/entities/contact.js'
import { GroupAudioMessage } from '@/domain/chat/enterprise/entities/group/audio-message.js'
import type { GroupChat } from '@/domain/chat/enterprise/entities/group/chat.js'
import { GroupDocumentMessage } from '@/domain/chat/enterprise/entities/group/document-message.js'
import { GroupImageMessage } from '@/domain/chat/enterprise/entities/group/image-message.js'
import { GroupMultiVCardMessage } from '@/domain/chat/enterprise/entities/group/multi-v-card-message.js'
import { GroupRevokedMessage } from '@/domain/chat/enterprise/entities/group/revoked-message.js'
import { GroupTextMessage } from '@/domain/chat/enterprise/entities/group/text-message.js'
import { GroupUnknownMessage } from '@/domain/chat/enterprise/entities/group/unknown-message.js'
import { GroupVCardMessage } from '@/domain/chat/enterprise/entities/group/v-card-message.js'
import { GroupVideoMessage } from '@/domain/chat/enterprise/entities/group/video-message.js'
import { GroupVoiceMessage } from '@/domain/chat/enterprise/entities/group/voice-message.js'
import { makeGroupChat } from '@/test/factories/chat/group/make-group-chat.js'
import { makeContact } from '@/test/factories/chat/make-contact.js'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message.js'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact.js'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media.js'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository.js'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository.js'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository.js'
import { FakeDateService } from '@/test/services/chat/fake-date-service.js'
import { FakeStorageService } from '@/test/services/chat/fake-storage-service.js'
import { CreateContactFromWAContactUseCase } from '../../../contacts/create-contact-from-wa-contact-use-case.js'
import { CreateContactsFromWAContactsUseCase } from '../../../contacts/create-contacts-from-wa-contacts-use-case.js'
import { CreateMessageMediaFromWAMessageUseCase } from '../../create-message-media-from-wa-message-use-case.js'
import { CreateGroupAudioMessageFromWAMessageUseCase } from '../create-group-audio-message-from-wa-message-use-case.js'
import { CreateGroupDocumentMessageFromWAMessageUseCase } from '../create-group-document-message-from-wa-message-use-case.js'
import { CreateGroupImageMessageFromWAMessageUseCase } from '../create-group-image-message-from-wa-message-use-case.js'
import { CreateGroupMessageFromWAMessageUseCase } from '../create-group-message-from-wa-message-use-case.js'
import { CreateGroupMultiVCardMessageFromWAMessageUseCase } from '../create-group-multi-card-message-from-wa-message-use-case.js'
import { CreateGroupRevokedMessageFromWAMessageUseCase } from '../create-group-revoked-message-from-wa-message-use-case.js'
import { CreateGroupTextMessageFromWAMessageUseCase } from '../create-group-text-message-from-wa-message-use-case.js'
import { CreateGroupUnknownMessageFromWAMessageUseCase } from '../create-group-unknown-message-from-wa-message-use-case.js'
import { CreateGroupVCardMessageFromWAMessageUseCase } from '../create-group-v-card-message-from-wa-message-use-case.js'
import { CreateGroupVideoMessageFromWAMessageUseCase } from '../create-group-video-message-from-wa-message-use-case.js'
import { CreateGroupVoiceMessageFromWAMessageUseCase } from '../create-group-voice-message-from-wa-message-use-case.js'

describe('CreateGroupMessageFromWAMessageUseCase', () => {
  let contactsRepository: InMemoryContactsRepository

  let createContactFromWAContact: CreateContactFromWAContactUseCase

  let chatsRepository: InMemoryChatsRepository
  let messagesRepository: InMemoryMessagesRepository

  let storageService: FakeStorageService
  let createMessageMediaFromWAMessage: CreateMessageMediaFromWAMessageUseCase

  let dateService: FakeDateService

  let createGroupAudioMessageFromWAMessage: CreateGroupAudioMessageFromWAMessageUseCase
  let createGroupDocumentMessageFromWAMessage: CreateGroupDocumentMessageFromWAMessageUseCase
  let createGroupImageMessageFromWAMessage: CreateGroupImageMessageFromWAMessageUseCase

  let createContactsFromWAContactsUseCase: CreateContactsFromWAContactsUseCase

  let createGroupMultiVCardMessageFromWAMessage: CreateGroupMultiVCardMessageFromWAMessageUseCase
  let createGroupRevokedMessageFromWAMessage: CreateGroupRevokedMessageFromWAMessageUseCase

  let createGroupTextMessageFromWAMessage: CreateGroupTextMessageFromWAMessageUseCase
  let createGroupUnknownMessageFromWAMessage: CreateGroupUnknownMessageFromWAMessageUseCase

  let createGroupVCardMessageFromWAMessage: CreateGroupVCardMessageFromWAMessageUseCase

  let createGroupVideoMessageFromWAMessage: CreateGroupVideoMessageFromWAMessageUseCase
  let createGroupVoiceMessageFromWAMessage: CreateGroupVoiceMessageFromWAMessageUseCase

  let sut: CreateGroupMessageFromWAMessageUseCase

  let chat: GroupChat
  let author: Contact

  beforeEach(() => {
    contactsRepository = new InMemoryContactsRepository()

    createContactFromWAContact = new CreateContactFromWAContactUseCase(
      contactsRepository
    )

    chatsRepository = new InMemoryChatsRepository()
    messagesRepository = new InMemoryMessagesRepository()
    storageService = new FakeStorageService()

    storageService = new FakeStorageService()
    createMessageMediaFromWAMessage =
      new CreateMessageMediaFromWAMessageUseCase(storageService)

    dateService = new FakeDateService()

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

    sut = new CreateGroupMessageFromWAMessageUseCase(
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

    chat = makeGroupChat()
    chatsRepository.items.push(chat)

    author = makeContact({ instanceId: chat.instanceId })
    contactsRepository.items.push(author)
  })

  it('should be able to create a group audio message', async () => {
    const waMessage = makeWAGroupMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'audio',
      media: makeWAMessageMedia(),
      author: makeWAPrivateContact(
        { instanceId: chat.instanceId },
        author.waContactId
      ),
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(GroupAudioMessage)
  })

  it('should be able to create a group document message', async () => {
    const waMessage = makeWAGroupMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'document',
      media: makeWAMessageMedia(),
      author: makeWAPrivateContact(
        { instanceId: author.instanceId },
        author.waContactId
      ),
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(GroupDocumentMessage)
  })

  it('should be able to create a group image message', async () => {
    const waMessage = makeWAGroupMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'image',
      media: makeWAMessageMedia(),
      author: makeWAPrivateContact(
        { instanceId: author.instanceId },
        author.waContactId
      ),
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(GroupImageMessage)
  })

  it('should be able to create a group multi vcard message', async () => {
    const waMessage = makeWAGroupMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'multi_vcard',
      contacts: [
        makeWAPrivateContact({
          instanceId: chat.instanceId,
        }),
      ],
      author: makeWAPrivateContact(
        { instanceId: author.instanceId },
        author.waContactId
      ),
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(GroupMultiVCardMessage)
  })

  it('should be able to create a group vcard message', async () => {
    const waMessage = makeWAGroupMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'vcard',
      contacts: [
        makeWAPrivateContact({
          instanceId: chat.instanceId,
        }),
      ],
      author: makeWAPrivateContact(
        { instanceId: author.instanceId },
        author.waContactId
      ),
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(GroupVCardMessage)
  })

  it('should be able to create a group revoked message', async () => {
    const waMessage = makeWAGroupMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'revoked',
      author: makeWAPrivateContact(
        { instanceId: author.instanceId },
        author.waContactId
      ),
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(GroupRevokedMessage)
  })

  it('should be able to create a group video message', async () => {
    const waMessage = makeWAGroupMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'video',
      media: makeWAMessageMedia(),
      author: makeWAPrivateContact(
        { instanceId: author.instanceId },
        author.waContactId
      ),
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(GroupVideoMessage)
  })

  it('should be able to create a group voice message', async () => {
    const waMessage = makeWAGroupMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'voice',
      media: makeWAMessageMedia(),
      author: makeWAPrivateContact(
        { instanceId: author.instanceId },
        author.waContactId
      ),
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(GroupVoiceMessage)
  })

  it('should be able to create a group text message', async () => {
    const waMessage = makeWAGroupMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'text',
      author: makeWAPrivateContact(
        { instanceId: author.instanceId },
        author.waContactId
      ),
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(GroupTextMessage)
  })

  it('should be able to create a group unknown message', async () => {
    const waMessage = makeWAGroupMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'unknown',
      author: makeWAPrivateContact(
        { instanceId: author.instanceId },
        author.waContactId
      ),
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(GroupUnknownMessage)
  })
})
