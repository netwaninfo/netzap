import { makeGroup } from '@/test/factories/chat/make-group.js'
import { makeWAGroupChat } from '@/test/factories/chat/wa/make-wa-group-chat.js'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact.js'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository.js'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository.js'
import { InMemoryGroupsRepository } from '@/test/repositories/chat/in-memory-groups-repository.js'
import { FakeDateService } from '@/test/services/chat/fake-date-service.js'
import { each } from '@/test/utilities/each.js'
import { CreateContactsFromWAContactsUseCase } from '../../contacts/create-contacts-from-wa-contacts-use-case.js'
import { CreateGroupFromWAContactUseCase } from '../../groups/create-group-from-wa-contact-use-case.js'
import { CreateGroupChatFromWAChatUseCase } from '../create-group-chat-from-wa-chat-use-case.js'

describe('CreateGroupChatFromWAChatUseCase', () => {
  let chatsRepository: InMemoryChatsRepository
  let groupsRepository: InMemoryGroupsRepository

  let createGroupFromWAContactUseCase: CreateGroupFromWAContactUseCase

  let contactsRepository: InMemoryContactsRepository

  let createContactsFromWAContacts: CreateContactsFromWAContactsUseCase

  let dateService: FakeDateService

  let sut: CreateGroupChatFromWAChatUseCase

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

    sut = new CreateGroupChatFromWAChatUseCase(
      chatsRepository,
      groupsRepository,
      createGroupFromWAContactUseCase,
      createContactsFromWAContacts,
      dateService
    )
  })

  it('should be able to create chat from wa chat', async () => {
    const waChat = makeWAGroupChat({
      participants: each(2).map(() => makeWAPrivateContact()),
    })

    const response = await sut.execute({ waChat })

    expect(response.isSuccess()).toBe(true)
    expect(chatsRepository.items).toHaveLength(1)
    expect(groupsRepository.items).toHaveLength(1)
    expect(contactsRepository.items).toHaveLength(2)
  })

  it('should be able to create chat from wa chat with an existing group', async () => {
    const waChat = makeWAGroupChat()
    const group = makeGroup({
      instanceId: waChat.contact.instanceId,
      waGroupId: waChat.contact.id,
    })

    groupsRepository.items.push(group)

    const response = await sut.execute({ waChat })

    expect(response.isSuccess()).toBe(true)
    expect(chatsRepository.items).toHaveLength(1)
    expect(groupsRepository.items).toHaveLength(1)
  })
})
