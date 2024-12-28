import { GroupChat } from '@/domain/chat/enterprise/entities/group/chat.js'
import { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat.js'
import { makeWAGroupChat } from '@/test/factories/chat/wa/make-wa-group-chat.js'
import { makeWAPrivateChat } from '@/test/factories/chat/wa/make-wa-private-chat.js'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository.js'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository.js'
import { InMemoryGroupsRepository } from '@/test/repositories/chat/in-memory-groups-repository.js'
import { FakeDateService } from '@/test/services/chat/fake-date-service.js'
import { CreateContactFromWAContactUseCase } from '../../contacts/create-contact-from-wa-contact-use-case.js'
import { CreateContactsFromWAContactsUseCase } from '../../contacts/create-contacts-from-wa-contacts-use-case.js'
import { CreateGroupFromWAContactUseCase } from '../../groups/create-group-from-wa-contact-use-case.js'
import { CreateChatFromWAChatUseCase } from '../create-chat-from-wa-chat-use-case.js'
import { CreateGroupChatFromWAChatUseCase } from '../create-group-chat-from-wa-chat-use-case.js'
import { CreatePrivateChatFromWAChatUseCase } from '../create-private-chat-from-wa-chat-use-case.js'

describe('CreateChatFromWAChatUseCase', () => {
  let chatsRepository: InMemoryChatsRepository
  let groupsRepository: InMemoryGroupsRepository

  let createGroupFromWAContactUseCase: CreateGroupFromWAContactUseCase

  let dateService: FakeDateService

  let contactsRepository: InMemoryContactsRepository

  let createContactsFromWAContacts: CreateContactsFromWAContactsUseCase

  let createGroupChatFromWAChatUseCase: CreateGroupChatFromWAChatUseCase

  let createContactFromWAContactUseCase: CreateContactFromWAContactUseCase

  let createPrivateChatFromWAChatUseCase: CreatePrivateChatFromWAChatUseCase

  let sut: CreateChatFromWAChatUseCase

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

    sut = new CreateChatFromWAChatUseCase(
      createGroupChatFromWAChatUseCase,
      createPrivateChatFromWAChatUseCase
    )
  })

  it('should be able to create private chat from wa chat', async () => {
    const response = await sut.execute({
      waChat: makeWAPrivateChat(),
    })

    expect(response.isSuccess()).toBe(true)
    expect(chatsRepository.items).toHaveLength(1)
    expect(chatsRepository.items[0]).toBeInstanceOf(PrivateChat)
  })

  it('should be able to create group chat from wa chat', async () => {
    const response = await sut.execute({
      waChat: makeWAGroupChat(),
    })

    expect(response.isSuccess()).toBe(true)
    expect(chatsRepository.items).toHaveLength(1)
    expect(chatsRepository.items[0]).toBeInstanceOf(GroupChat)
  })
})
