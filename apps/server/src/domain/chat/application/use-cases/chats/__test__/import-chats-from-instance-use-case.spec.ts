import { makeWAGroupChat } from '@/test/factories/chat/wa/make-wa-group-chat'
import { makeWAPrivateChat } from '@/test/factories/chat/wa/make-wa-private-chat'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { InMemoryGroupsRepository } from '@/test/repositories/chat/in-memory-groups-repository'
import { FakeWhatsAppService } from '@/test/services/chat/fake-whats-app-service'
import { each } from '@/test/utilities/each'
import { CreateContactFromWAContactUseCase } from '../../contacts/create-contact-from-wa-contact-use-case'
import { CreateContactsFromWAContactsUseCase } from '../../contacts/create-contacts-from-wa-contacts-use-case'
import { CreateGroupFromWAContactUseCase } from '../../groups/create-group-from-wa-contact-use-case'
import { CreateChatFromWAChatUseCase } from '../create-chat-from-wa-chat-use-case'
import { CreateGroupChatFromWAChatUseCase } from '../create-group-chat-from-wa-chat-use-case'
import { CreatePrivateChatFromWAChatUseCase } from '../create-private-chat-from-wa-chat-use-case'
import { ImportChatsFromInstanceUseCase } from '../import-chats-from-instance-use-case'

describe('ImportChatsFromInstanceUseCase', () => {
  let chatsRepository: InMemoryChatsRepository
  let groupsRepository: InMemoryGroupsRepository

  let createGroupFromWAContactUseCase: CreateGroupFromWAContactUseCase

  let contactsRepository: InMemoryContactsRepository

  let createContactsFromWAContacts: CreateContactsFromWAContactsUseCase

  let createGroupChatFromWAChatUseCase: CreateGroupChatFromWAChatUseCase

  let createContactFromWAContactUseCase: CreateContactFromWAContactUseCase

  let createPrivateChatFromWAChatUseCase: CreatePrivateChatFromWAChatUseCase

  let createChatFromWAChat: CreateChatFromWAChatUseCase

  let whatsAppService: FakeWhatsAppService

  let sut: ImportChatsFromInstanceUseCase

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

    createGroupChatFromWAChatUseCase = new CreateGroupChatFromWAChatUseCase(
      chatsRepository,
      groupsRepository,
      createGroupFromWAContactUseCase,
      createContactsFromWAContacts
    )

    createContactFromWAContactUseCase = new CreateContactFromWAContactUseCase(
      contactsRepository
    )

    createPrivateChatFromWAChatUseCase = new CreatePrivateChatFromWAChatUseCase(
      chatsRepository,
      contactsRepository,
      createContactFromWAContactUseCase
    )

    createChatFromWAChat = new CreateChatFromWAChatUseCase(
      createGroupChatFromWAChatUseCase,
      createPrivateChatFromWAChatUseCase
    )

    whatsAppService = new FakeWhatsAppService()

    sut = new ImportChatsFromInstanceUseCase(
      createChatFromWAChat,
      whatsAppService
    )
  })

  it('should be able to import chats from instance', async () => {
    const instanceId = makeUniqueEntityID()

    const waPrivateChats = each(2).map(() => makeWAPrivateChat({ instanceId }))
    const waGroupChats = each(3).map(() => makeWAGroupChat({ instanceId }))
    whatsAppService.chats.push(...waPrivateChats, ...waGroupChats)

    const response = await sut.execute({
      instanceId,
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    expect(chatsRepository.items).toHaveLength(5)
  })
})
