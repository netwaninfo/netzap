import type { Contact } from '@/domain/chat/enterprise/entities/contact.js'
import type { GroupChat } from '@/domain/chat/enterprise/entities/group/chat.js'
import { makeGroupChat } from '@/test/factories/chat/group/make-group-chat.js'
import { makeContact } from '@/test/factories/chat/make-contact.js'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message.js'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact.js'
import { faker } from '@/test/lib/faker.js'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository.js'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository.js'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository.js'
import { FakeDateService } from '@/test/services/chat/fake-date-service.js'
import { CreateGroupRevokedMessageFromWAMessageUseCase } from '../create-group-revoked-message-from-wa-message-use-case.js'

describe('CreateGroupRevokedMessageFromWAMessageUseCase', () => {
  let chatsRepository: InMemoryChatsRepository
  let contactsRepository: InMemoryContactsRepository
  let messagesRepository: InMemoryMessagesRepository
  let dateService: FakeDateService

  let sut: CreateGroupRevokedMessageFromWAMessageUseCase

  let chat: GroupChat
  let author: Contact

  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    contactsRepository = new InMemoryContactsRepository()
    messagesRepository = new InMemoryMessagesRepository()
    dateService = new FakeDateService()

    sut = new CreateGroupRevokedMessageFromWAMessageUseCase(
      chatsRepository,
      contactsRepository,
      messagesRepository,
      dateService
    )

    chat = makeGroupChat()
    chatsRepository.items.push(chat)

    author = makeContact({ instanceId: chat.instanceId })
    contactsRepository.items.push(author)
  })

  it('should be able to create a group revoked message', async () => {
    const response = await sut.execute({
      waMessage: makeWAGroupMessage({
        instanceId: chat.instanceId,
        waChatId: chat.waChatId,
        type: 'revoked',
        body: faker.lorem.paragraph(),
        author: makeWAPrivateContact(
          { instanceId: author.instanceId },
          author.waContactId
        ),
      }),
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    expect(messagesRepository.items).toHaveLength(1)
  })
})
