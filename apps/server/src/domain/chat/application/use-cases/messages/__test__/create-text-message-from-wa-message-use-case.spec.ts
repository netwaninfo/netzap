import { GroupMessage } from '@/domain/chat/enterprise/entities/group/message.js'
import { PrivateMessage } from '@/domain/chat/enterprise/entities/private/message.js'
import { makeGroupChat } from '@/test/factories/chat/group/make-group-chat.js'
import { makeContact } from '@/test/factories/chat/make-contact.js'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat.js'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message.js'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact.js'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message.js'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository.js'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository.js'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository.js'
import { FakeDateService } from '@/test/services/chat/fake-date-service.js'
import { CreateTextMessageFromWAMessageUseCase } from '../create-text-message-from-wa-message-use-case.js'
import { CreateGroupTextMessageFromWAMessageUseCase } from '../group/create-group-text-message-from-wa-message-use-case.js'
import { CreatePrivateTextMessageFromWAMessageUseCase } from '../private/create-private-text-message-from-wa-message-use-case.js'

describe('CreateTextMessageFromWAMessageUseCase', () => {
  let chatsRepository: InMemoryChatsRepository
  let messagesRepository: InMemoryMessagesRepository
  let dateService: FakeDateService

  let createPrivateTextMessageFromWAMessage: CreatePrivateTextMessageFromWAMessageUseCase

  let contactsRepository: InMemoryContactsRepository
  let createGroupTextMessageFromWAMessage: CreateGroupTextMessageFromWAMessageUseCase

  let sut: CreateTextMessageFromWAMessageUseCase

  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    messagesRepository = new InMemoryMessagesRepository()
    dateService = new FakeDateService()

    createPrivateTextMessageFromWAMessage =
      new CreatePrivateTextMessageFromWAMessageUseCase(
        chatsRepository,
        messagesRepository,
        dateService
      )

    contactsRepository = new InMemoryContactsRepository()
    createGroupTextMessageFromWAMessage =
      new CreateGroupTextMessageFromWAMessageUseCase(
        chatsRepository,
        contactsRepository,
        messagesRepository,
        dateService
      )

    sut = new CreateTextMessageFromWAMessageUseCase(
      createPrivateTextMessageFromWAMessage,
      createGroupTextMessageFromWAMessage
    )
  })

  it('should be able to create a private text message', async () => {
    const chat = makePrivateChat()
    chatsRepository.items.push(chat)

    const waMessage = makeWAPrivateMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'text',
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(PrivateMessage)
  })

  it('should be able to create a group text message', async () => {
    const chat = makeGroupChat()
    chatsRepository.items.push(chat)

    const author = makeContact({ instanceId: chat.instanceId })
    contactsRepository.items.push(author)

    const waMessage = makeWAGroupMessage({
      waChatId: chat.waChatId,
      instanceId: chat.instanceId,
      type: 'text',
      author: makeWAPrivateContact(
        { instanceId: chat.instanceId },
        author.waContactId
      ),
    })

    const response = await sut.execute({ waMessage })
    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value
    expect(message).instanceOf(GroupMessage)
  })
})
