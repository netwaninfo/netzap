import timers from 'node:timers/promises'

import { makeInstance } from '@/test/factories/chat/make-instance.js'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository.js'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository.js'
import { InMemoryGroupsRepository } from '@/test/repositories/chat/in-memory-groups-repository.js'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository.js'
import { FakeDateService } from '@/test/services/chat/fake-date-service.js'
import { FakeStorageService } from '@/test/services/chat/fake-storage-service.js'
import { FakeWhatsAppService } from '@/test/services/chat/fake-whats-app-service.js'
import { CreateChatFromWAChatUseCase } from '../../chats/create-chat-from-wa-chat-use-case.js'
import { CreateGroupChatFromWAChatUseCase } from '../../chats/create-group-chat-from-wa-chat-use-case.js'
import { CreatePrivateChatFromWAChatUseCase } from '../../chats/create-private-chat-from-wa-chat-use-case.js'
import { ImportChatsFromInstanceUseCase } from '../../chats/import-chats-from-instance-use-case.js'
import { LinkChatLastMessageFromWAMessageUseCase } from '../../chats/link-chat-last-message-from-wa-message-use-case.js'
import { CreateContactFromWAContactUseCase } from '../../contacts/create-contact-from-wa-contact-use-case.js'
import { CreateContactsFromWAContactsUseCase } from '../../contacts/create-contacts-from-wa-contacts-use-case.js'
import { ImportContactsFromInstanceUseCase } from '../../contacts/import-contacts-from-instance-use-case.js'
import { CreateGroupFromWAContactUseCase } from '../../groups/create-group-from-wa-contact-use-case.js'
import { CreateMessageFromWAMessageUseCase } from '../../messages/create-message-from-wa-message-use-case.js'
import { CreateMessageMediaFromWAMessageUseCase } from '../../messages/create-message-media-from-wa-message-use-case.js'
import { CreateGroupAudioMessageFromWAMessageUseCase } from '../../messages/group/create-group-audio-message-from-wa-message-use-case.js'
import { CreateGroupDocumentMessageFromWAMessageUseCase } from '../../messages/group/create-group-document-message-from-wa-message-use-case.js'
import { CreateGroupImageMessageFromWAMessageUseCase } from '../../messages/group/create-group-image-message-from-wa-message-use-case.js'
import { CreateGroupMessageFromWAMessageUseCase } from '../../messages/group/create-group-message-from-wa-message-use-case.js'
import { CreateGroupMultiVCardMessageFromWAMessageUseCase } from '../../messages/group/create-group-multi-card-message-from-wa-message-use-case.js'
import { CreateGroupRevokedMessageFromWAMessageUseCase } from '../../messages/group/create-group-revoked-message-from-wa-message-use-case.js'
import { CreateGroupTextMessageFromWAMessageUseCase } from '../../messages/group/create-group-text-message-from-wa-message-use-case.js'
import { CreateGroupUnknownMessageFromWAMessageUseCase } from '../../messages/group/create-group-unknown-message-from-wa-message-use-case.js'
import { CreateGroupVCardMessageFromWAMessageUseCase } from '../../messages/group/create-group-v-card-message-from-wa-message-use-case.js'
import { CreateGroupVideoMessageFromWAMessageUseCase } from '../../messages/group/create-group-video-message-from-wa-message-use-case.js'
import { CreateGroupVoiceMessageFromWAMessageUseCase } from '../../messages/group/create-group-voice-message-from-wa-message-use-case.js'
import { ImportMessagesFromInstanceUseCase } from '../../messages/import-messages-from-instance-use-case.js'
import { CreatePrivateAudioMessageFromWAMessageUseCase } from '../../messages/private/create-private-audio-message-from-wa-message-use-case.js'
import { CreatePrivateDocumentMessageFromWAMessageUseCase } from '../../messages/private/create-private-document-message-from-wa-message-use-case.js'
import { CreatePrivateImageMessageFromWAMessageUseCase } from '../../messages/private/create-private-image-message-from-wa-message-use-case.js'
import { CreatePrivateMessageFromWAMessageUseCase } from '../../messages/private/create-private-message-from-wa-message-use-case.js'
import { CreatePrivateMultiVCardMessageFromWAMessageUseCase } from '../../messages/private/create-private-multi-card-message-from-wa-message-use-case.js'
import { CreatePrivateRevokedMessageFromWAMessageUseCase } from '../../messages/private/create-private-revoked-message-from-wa-message-use-case.js'
import { CreatePrivateTextMessageFromWAMessageUseCase } from '../../messages/private/create-private-text-message-from-wa-message-use-case.js'
import { CreatePrivateUnknownMessageFromWAMessageUseCase } from '../../messages/private/create-private-unknown-message-from-wa-message-use-case.js'
import { CreatePrivateVCardMessageFromWAMessageUseCase } from '../../messages/private/create-private-v-card-message-from-wa-message-use-case.js'
import { CreatePrivateVideoMessageFromWAMessageUseCase } from '../../messages/private/create-private-video-message-from-wa-message-use-case.js'
import { CreatePrivateVoiceMessageFromWAMessageUseCase } from '../../messages/private/create-private-voice-message-from-wa-message-use-case.js'
import { ImportFromInstanceUseCase } from '../import-from-instance-use-case.js'

describe('ImportFromInstanceUseCase', () => {
  let contactsRepository: InMemoryContactsRepository
  let createContactsFromWAContacts: CreateContactsFromWAContactsUseCase
  let whatsAppService: FakeWhatsAppService

  let importContacts: ImportContactsFromInstanceUseCase

  let chatsRepository: InMemoryChatsRepository
  let messagesRepository: InMemoryMessagesRepository

  let storageService: FakeStorageService
  let createMessageMediaFromWAMessage: CreateMessageMediaFromWAMessageUseCase

  let dateService: FakeDateService

  let linkChatLastMessageFromWAMessage: LinkChatLastMessageFromWAMessageUseCase

  let groupsRepository: InMemoryGroupsRepository

  let createGroupFromWAContactUseCase: CreateGroupFromWAContactUseCase

  let createGroupChatFromWAChatUseCase: CreateGroupChatFromWAChatUseCase

  let createContactFromWAContactUseCase: CreateContactFromWAContactUseCase

  let createPrivateChatFromWAChatUseCase: CreatePrivateChatFromWAChatUseCase

  let createChatFromWAChat: CreateChatFromWAChatUseCase

  let importChats: ImportChatsFromInstanceUseCase

  let createPrivateAudioMessageFromWAMessageUseCase: CreatePrivateAudioMessageFromWAMessageUseCase
  let createPrivateDocumentMessageFromWAMessageUseCase: CreatePrivateDocumentMessageFromWAMessageUseCase
  let createPrivateImageMessageFromWAMessageUseCase: CreatePrivateImageMessageFromWAMessageUseCase

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

  let importMessages: ImportMessagesFromInstanceUseCase

  let sut: ImportFromInstanceUseCase

  beforeEach(() => {
    contactsRepository = new InMemoryContactsRepository()

    createContactsFromWAContacts = new CreateContactsFromWAContactsUseCase(
      contactsRepository
    )

    whatsAppService = new FakeWhatsAppService()

    importContacts = new ImportContactsFromInstanceUseCase(
      createContactsFromWAContacts,
      whatsAppService
    )

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

    linkChatLastMessageFromWAMessage =
      new LinkChatLastMessageFromWAMessageUseCase(
        chatsRepository,
        createMessageFromWAMessageUseCase
      )

    groupsRepository = new InMemoryGroupsRepository()

    createGroupFromWAContactUseCase = new CreateGroupFromWAContactUseCase(
      groupsRepository
    )

    createGroupChatFromWAChatUseCase = new CreateGroupChatFromWAChatUseCase(
      chatsRepository,
      groupsRepository,
      createGroupFromWAContactUseCase,
      createContactsFromWAContacts,
      dateService
    )

    createContactFromWAContactUseCase = new CreateContactFromWAContactUseCase(
      contactsRepository
    )

    createPrivateChatFromWAChatUseCase = new CreatePrivateChatFromWAChatUseCase(
      chatsRepository,
      contactsRepository,
      createContactFromWAContactUseCase,
      dateService
    )

    createChatFromWAChat = new CreateChatFromWAChatUseCase(
      createGroupChatFromWAChatUseCase,
      createPrivateChatFromWAChatUseCase
    )

    importChats = new ImportChatsFromInstanceUseCase(
      createChatFromWAChat,
      linkChatLastMessageFromWAMessage,
      whatsAppService
    )

    importMessages = new ImportMessagesFromInstanceUseCase(
      createMessageFromWAMessageUseCase,
      whatsAppService
    )

    sut = new ImportFromInstanceUseCase(
      importContacts,
      importChats,
      importMessages
    )
  })

  it('should be able to import from instance', async () => {
    const instance = makeInstance()

    const mockImportContacts = vi.spyOn(importContacts, 'execute')
    const mockImportChats = vi.spyOn(importChats, 'execute')
    const mockImportMessages = vi.spyOn(importMessages, 'execute')

    const response = await sut.execute({
      instanceId: instance.id,
    })

    expect(response.isSuccess()).toBe(true)

    // Used because ImportFromInstance does not wait for import promises to be resolved
    await timers.setTimeout(200)

    expect(mockImportContacts).toHaveBeenCalled()
    expect(mockImportChats).toHaveBeenCalled()
    expect(mockImportMessages).toHaveBeenCalled()
  })
})
