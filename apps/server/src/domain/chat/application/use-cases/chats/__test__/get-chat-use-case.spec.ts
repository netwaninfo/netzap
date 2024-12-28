import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat.js'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeWAPrivateChat } from '@/test/factories/chat/wa/make-wa-private-chat.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository.js'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository.js'
import { InMemoryGroupsRepository } from '@/test/repositories/chat/in-memory-groups-repository.js'
import { FakeDateService } from '@/test/services/chat/fake-date-service.js'
import { FakeWhatsAppService } from '@/test/services/chat/fake-whats-app-service.js'
import { CreateContactFromWAContactUseCase } from '../../contacts/create-contact-from-wa-contact-use-case.js'
import { CreateContactsFromWAContactsUseCase } from '../../contacts/create-contacts-from-wa-contacts-use-case.js'
import { CreateGroupFromWAContactUseCase } from '../../groups/create-group-from-wa-contact-use-case.js'
import { CreateChatFromWAChatUseCase } from '../create-chat-from-wa-chat-use-case.js'
import { CreateGroupChatFromWAChatUseCase } from '../create-group-chat-from-wa-chat-use-case.js'
import { CreatePrivateChatFromWAChatUseCase } from '../create-private-chat-from-wa-chat-use-case.js'
import { GetChatUseCase } from '../get-chat-use-case.js'

describe('GetChatUseCase', () => {
  let chatsRepository: InMemoryChatsRepository
  let groupsRepository: InMemoryGroupsRepository

  let createGroupFromWAContactUseCase: CreateGroupFromWAContactUseCase

  let dateService: FakeDateService

  let contactsRepository: InMemoryContactsRepository

  let createContactsFromWAContacts: CreateContactsFromWAContactsUseCase

  let createGroupChatFromWAChatUseCase: CreateGroupChatFromWAChatUseCase

  let createContactFromWAContactUseCase: CreateContactFromWAContactUseCase

  let createPrivateChatFromWAChatUseCase: CreatePrivateChatFromWAChatUseCase

  let createChatFromWAChatUseCase: CreateChatFromWAChatUseCase

  let whatsAppService: FakeWhatsAppService

  let sut: GetChatUseCase

  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    groupsRepository = new InMemoryGroupsRepository()

    createGroupFromWAContactUseCase = new CreateGroupFromWAContactUseCase(
      groupsRepository
    )

    contactsRepository = new InMemoryContactsRepository()

    createContactsFromWAContacts = new CreateContactsFromWAContactsUseCase(
      contactsRepository
    )

    dateService = new FakeDateService()

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

    createChatFromWAChatUseCase = new CreateChatFromWAChatUseCase(
      createGroupChatFromWAChatUseCase,
      createPrivateChatFromWAChatUseCase
    )

    whatsAppService = new FakeWhatsAppService()

    sut = new GetChatUseCase(
      chatsRepository,
      createChatFromWAChatUseCase,
      whatsAppService
    )
  })

  it('should be able to get chat', async () => {
    const instanceId = makeUniqueEntityID()
    const waChatId = makeWAEntityID()

    chatsRepository.items.push(makePrivateChat({ instanceId, waChatId }))

    const response = await sut.execute({
      instanceId,
      waChatId,
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return
    const { chat } = response.value

    expect(chat).toEqual(expect.objectContaining({ instanceId, waChatId }))
  })

  it('should be able to get chat after create', async () => {
    const waChatId = makeWAEntityID()
    const instanceId = makeUniqueEntityID()

    whatsAppService.chats.push(makeWAPrivateChat({ instanceId }, waChatId))

    const response = await sut.execute({
      instanceId,
      waChatId,
    })

    expect(response.isSuccess()).toBe(true)
    expect(chatsRepository.items).toHaveLength(1)
  })
})
