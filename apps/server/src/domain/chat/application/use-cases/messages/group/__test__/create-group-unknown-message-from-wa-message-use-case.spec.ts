import type { Contact } from '@/domain/chat/enterprise/entities/contact.js'
import type { GroupChat } from '@/domain/chat/enterprise/entities/group/chat.js'
import { GroupMessage } from '@/domain/chat/enterprise/entities/group/message.js'
import { makeGroupChat } from '@/test/factories/chat/group/make-group-chat.js'
import { makeGroupUnknownMessage } from '@/test/factories/chat/group/make-group-unknown-message.js'
import { makeContact } from '@/test/factories/chat/make-contact.js'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message.js'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact.js'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media.js'
import { faker } from '@/test/lib/faker.js'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository.js'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository.js'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository.js'
import { FakeDateService } from '@/test/services/chat/fake-date-service.js'
import { CreateGroupUnknownMessageFromWAMessageUseCase } from '../create-group-unknown-message-from-wa-message-use-case.js'

describe('CreateGroupUnknownMessageFromWAMessageUseCase', () => {
  let chatsRepository: InMemoryChatsRepository
  let contactsRepository: InMemoryContactsRepository
  let messagesRepository: InMemoryMessagesRepository
  let dateService: FakeDateService

  let sut: CreateGroupUnknownMessageFromWAMessageUseCase

  let chat: GroupChat
  let author: Contact

  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    contactsRepository = new InMemoryContactsRepository()
    messagesRepository = new InMemoryMessagesRepository()
    dateService = new FakeDateService()

    sut = new CreateGroupUnknownMessageFromWAMessageUseCase(
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

  it('should be able to create a group unknown message', async () => {
    const response = await sut.execute({
      waMessage: makeWAGroupMessage({
        instanceId: chat.instanceId,
        waChatId: chat.waChatId,
        type: 'unknown',
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

  it('should be able to create a group unknown message quoting other message', async () => {
    const quotedMessage = makeGroupUnknownMessage({
      chatId: chat.id,
      instanceId: chat.instanceId,
    })
    messagesRepository.items.push(quotedMessage)

    const response = await sut.execute({
      waMessage: makeWAGroupMessage({
        instanceId: chat.instanceId,
        waChatId: chat.waChatId,
        type: 'unknown',
        author: makeWAPrivateContact(
          { instanceId: author.instanceId },
          author.waContactId
        ),
        quoted: makeWAGroupMessage(
          {
            type: 'unknown',
            media: makeWAMessageMedia(),
            instanceId: chat.instanceId,
            waChatId: chat.waChatId,
          },
          quotedMessage.waMessageId
        ),
      }),
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value

    expect(message.quoted).toBeInstanceOf(GroupMessage)
    expect(messagesRepository.items).toHaveLength(2)
  })
})
