import { success } from '@/core/either.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { Attendant } from '@/domain/chat/enterprise/entities/attendant.js'
import { GroupChat } from '@/domain/chat/enterprise/entities/group/chat.js'
import { GroupTextMessage } from '@/domain/chat/enterprise/entities/group/text-message.js'
import { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat.js'
import { PrivateTextMessage } from '@/domain/chat/enterprise/entities/private/text-message.js'
import { FakeChatEmitter } from '@/test/emitters/chat/fake-chat-emitter.js'
import { FakeMessageEmitter } from '@/test/emitters/chat/fake-message-emitter.js'
import { makeGroupChat } from '@/test/factories/chat/group/make-group-chat.js'
import { makeAttendant } from '@/test/factories/chat/make-attendant.js'
import { makeContact } from '@/test/factories/chat/make-contact.js'
import { makeGroup } from '@/test/factories/chat/make-group.js'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat.js'
import { makeWAGroupChat } from '@/test/factories/chat/wa/make-wa-group-chat.js'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message.js'
import { makeWAPrivateChat } from '@/test/factories/chat/wa/make-wa-private-chat.js'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { InMemoryAttendantsRepository } from '@/test/repositories/chat/in-memory-attendants-repository.js'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository.js'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository.js'
import { InMemoryGroupsRepository } from '@/test/repositories/chat/in-memory-groups-repository.js'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository.js'
import { FakeDateService } from '@/test/services/chat/fake-date-service.js'
import { FakeWhatsAppService } from '@/test/services/chat/fake-whats-app-service.js'
import { CreateChatFromWAChatUseCase } from '../../use-cases/chats/create-chat-from-wa-chat-use-case.js'
import { CreateGroupChatFromWAChatUseCase } from '../../use-cases/chats/create-group-chat-from-wa-chat-use-case.js'
import { CreatePrivateChatFromWAChatUseCase } from '../../use-cases/chats/create-private-chat-from-wa-chat-use-case.js'
import { CreateContactFromWAContactUseCase } from '../../use-cases/contacts/create-contact-from-wa-contact-use-case.js'
import { CreateContactsFromWAContactsUseCase } from '../../use-cases/contacts/create-contacts-from-wa-contacts-use-case.js'
import { CreateGroupFromWAContactUseCase } from '../../use-cases/groups/create-group-from-wa-contact-use-case.js'
import { CreateTextMessageFromWAMessageUseCase } from '../../use-cases/messages/create-text-message-from-wa-message-use-case.js'
import { CreateGroupTextMessageFromWAMessageUseCase } from '../../use-cases/messages/group/create-group-text-message-from-wa-message-use-case.js'
import { CreatePrivateTextMessageFromWAMessageUseCase } from '../../use-cases/messages/private/create-private-text-message-from-wa-message-use-case.js'
import { HandleSendTextMessage } from '../handle-send-text-message.js'

describe('HandleSendTextMessage', () => {
  let chatsRepository: InMemoryChatsRepository
  let messagesRepository: InMemoryMessagesRepository
  let attendantsRepository: InMemoryAttendantsRepository
  let dateService: FakeDateService

  let groupsRepository: InMemoryGroupsRepository

  let createGroupFromWAContact: CreateGroupFromWAContactUseCase

  let contactsRepository: InMemoryContactsRepository

  let createContactsFromWAContacts: CreateContactsFromWAContactsUseCase

  let createGroupChatFromWAChat: CreateGroupChatFromWAChatUseCase

  let createContactFromWAContact: CreateContactFromWAContactUseCase

  let createPrivateChatFromWAChat: CreatePrivateChatFromWAChatUseCase

  let createChatFromWAChat: CreateChatFromWAChatUseCase

  let createPrivateTextMessageFromWAMessage: CreatePrivateTextMessageFromWAMessageUseCase

  let createGroupTextMessageFromWAMessage: CreateGroupTextMessageFromWAMessageUseCase

  let createTextMessageFromWAMessage: CreateTextMessageFromWAMessageUseCase

  let whatsAppService: FakeWhatsAppService

  let messageEmitter: FakeMessageEmitter
  let chatEmitter: FakeChatEmitter

  let sut: HandleSendTextMessage

  let instanceId: UniqueEntityID
  let attendant: Attendant

  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    messagesRepository = new InMemoryMessagesRepository()
    attendantsRepository = new InMemoryAttendantsRepository()
    dateService = new FakeDateService()

    groupsRepository = new InMemoryGroupsRepository()

    createGroupFromWAContact = new CreateGroupFromWAContactUseCase(
      groupsRepository
    )

    contactsRepository = new InMemoryContactsRepository()

    createContactsFromWAContacts = new CreateContactsFromWAContactsUseCase(
      contactsRepository
    )

    createGroupChatFromWAChat = new CreateGroupChatFromWAChatUseCase(
      chatsRepository,
      groupsRepository,
      createGroupFromWAContact,
      createContactsFromWAContacts,
      dateService
    )

    createContactFromWAContact = new CreateContactFromWAContactUseCase(
      contactsRepository
    )

    createPrivateChatFromWAChat = new CreatePrivateChatFromWAChatUseCase(
      chatsRepository,
      contactsRepository,
      createContactFromWAContact,
      dateService
    )

    createChatFromWAChat = new CreateChatFromWAChatUseCase(
      createGroupChatFromWAChat,
      createPrivateChatFromWAChat
    )

    createPrivateTextMessageFromWAMessage =
      new CreatePrivateTextMessageFromWAMessageUseCase(
        chatsRepository,
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

    createTextMessageFromWAMessage = new CreateTextMessageFromWAMessageUseCase(
      createPrivateTextMessageFromWAMessage,
      createGroupTextMessageFromWAMessage
    )

    whatsAppService = new FakeWhatsAppService()

    messageEmitter = new FakeMessageEmitter()
    chatEmitter = new FakeChatEmitter()

    sut = new HandleSendTextMessage(
      chatsRepository,
      attendantsRepository,
      createChatFromWAChat,
      createTextMessageFromWAMessage,
      whatsAppService,
      messageEmitter,
      chatEmitter
    )

    instanceId = makeUniqueEntityID()
    attendant = makeAttendant()
    attendantsRepository.items.push(attendant)
  })

  it('should be able to send text message to private chat', async () => {
    whatsAppService.sendTextMessage = async params => {
      return success(await whatsAppService.sendPrivateTextMessage(params))
    }

    const waChat = makeWAPrivateChat({ instanceId })
    whatsAppService.chats.push(waChat)

    const response = await sut.execute({
      instanceId,
      attendantId: attendant.id,
      body: 'message',
      waChatId: waChat.id,
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message, chat } = response.value

    expect(messagesRepository.items).toHaveLength(1)
    expect(messageEmitter.items).toHaveLength(0)
    expect(message).toBeInstanceOf(PrivateTextMessage)

    expect(chatEmitter.items).toHaveLength(1)
    expect(chatsRepository.items).toHaveLength(1)
    expect(chat).toBeInstanceOf(PrivateChat)
    expect(chat.lastMessage).toBeTruthy()
  })

  it('should be able to send text message to private chat with previous chat', async () => {
    whatsAppService.sendTextMessage = async params => {
      return success(await whatsAppService.sendPrivateTextMessage(params))
    }

    const contact = makeContact({ instanceId })
    contactsRepository.items.push(contact)

    const privateChat = makePrivateChat({ instanceId, contact })
    chatsRepository.items.push(privateChat)

    const response = await sut.execute({
      instanceId,
      attendantId: attendant.id,
      body: 'message',
      waChatId: privateChat.waChatId,
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message, chat } = response.value

    expect(messagesRepository.items).toHaveLength(1)
    expect(messageEmitter.items).toHaveLength(1)
    expect(message).toBeInstanceOf(PrivateTextMessage)

    expect(chatEmitter.items).toHaveLength(1)
    expect(chatsRepository.items).toHaveLength(1)
    expect(chat).toBeInstanceOf(PrivateChat)
    expect(chat.lastMessage).toBeTruthy()
  })

  it('should be able to send text message to group chat', async () => {
    const author = makeContact({ instanceId })
    contactsRepository.items.push(author)

    whatsAppService.sendTextMessage = async params => {
      return success(
        makeWAGroupMessage({
          ...params,
          author: makeWAPrivateContact({}, author.waContactId),
        })
      )
    }

    const waChat = makeWAGroupChat({ instanceId })
    whatsAppService.chats.push(waChat)

    const response = await sut.execute({
      instanceId,
      attendantId: attendant.id,
      body: 'message',
      waChatId: waChat.id,
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message, chat } = response.value

    expect(messagesRepository.items).toHaveLength(1)
    expect(message).toBeInstanceOf(GroupTextMessage)
    expect(messageEmitter.items).toHaveLength(0)

    expect(chatEmitter.items).toHaveLength(1)
    expect(chatsRepository.items).toHaveLength(1)
    expect(chat).toBeInstanceOf(GroupChat)
    expect(chat.lastMessage).toBeTruthy()
  })

  it('should be able to send text message to group chat with previous chat', async () => {
    const author = makeContact({ instanceId })
    contactsRepository.items.push(author)

    whatsAppService.sendTextMessage = async params => {
      return success(
        makeWAGroupMessage({
          ...params,
          author: makeWAPrivateContact({}, author.waContactId),
        })
      )
    }

    const group = makeGroup({ instanceId })
    groupsRepository.items.push(group)

    const groupChat = makeGroupChat({ instanceId, group })
    chatsRepository.items.push(groupChat)

    const response = await sut.execute({
      instanceId,
      attendantId: attendant.id,
      body: 'message',
      waChatId: groupChat.waChatId,
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message, chat } = response.value

    expect(messagesRepository.items).toHaveLength(1)
    expect(message).toBeInstanceOf(GroupTextMessage)
    expect(messageEmitter.items).toHaveLength(1)

    expect(chatEmitter.items).toHaveLength(1)
    expect(chatsRepository.items).toHaveLength(1)
    expect(chat).toBeInstanceOf(GroupChat)
    expect(chat.lastMessage).toBeTruthy()
  })
})
