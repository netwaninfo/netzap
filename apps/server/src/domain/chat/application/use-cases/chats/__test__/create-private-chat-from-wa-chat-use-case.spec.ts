import { makeContact } from '@/test/factories/chat/make-contact.js'
import { makeWAPrivateChat } from '@/test/factories/chat/wa/make-wa-private-chat.js'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository.js'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository.js'
import { FakeDateService } from '@/test/services/chat/fake-date-service.js'
import { CreateContactFromWAContactUseCase } from '../../contacts/create-contact-from-wa-contact-use-case.js'
import { CreatePrivateChatFromWAChatUseCase } from '../create-private-chat-from-wa-chat-use-case.js'

describe('CreatePrivateChatFromWAChatUseCase', () => {
  let chatsRepository: InMemoryChatsRepository
  let contactsRepository: InMemoryContactsRepository

  let createContactFromWAContactUseCase: CreateContactFromWAContactUseCase

  let dateService: FakeDateService

  let sut: CreatePrivateChatFromWAChatUseCase

  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    contactsRepository = new InMemoryContactsRepository()

    createContactFromWAContactUseCase = new CreateContactFromWAContactUseCase(
      contactsRepository
    )

    dateService = new FakeDateService()

    sut = new CreatePrivateChatFromWAChatUseCase(
      chatsRepository,
      contactsRepository,
      createContactFromWAContactUseCase,
      dateService
    )
  })

  it('should be able to create chat from wa chat', async () => {
    const waChat = makeWAPrivateChat()

    const response = await sut.execute({ waChat })

    expect(response.isSuccess()).toBe(true)
    expect(chatsRepository.items).toHaveLength(1)
    expect(contactsRepository.items).toHaveLength(1)
  })

  it('should be able to create chat from wa chat with an existing contact', async () => {
    const waChat = makeWAPrivateChat()
    const contact = makeContact({
      instanceId: waChat.contact.instanceId,
      waContactId: waChat.contact.id,
    })

    contactsRepository.items.push(contact)

    const response = await sut.execute({ waChat })

    expect(response.isSuccess()).toBe(true)
    expect(chatsRepository.items).toHaveLength(1)
    expect(contactsRepository.items).toHaveLength(1)
  })
})
