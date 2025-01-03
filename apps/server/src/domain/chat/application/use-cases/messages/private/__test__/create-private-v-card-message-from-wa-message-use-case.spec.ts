import type { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat.js'
import { PrivateMessage } from '@/domain/chat/enterprise/entities/private/message.js'
import { makeContact } from '@/test/factories/chat/make-contact.js'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat.js'
import { makePrivateVCardMessage } from '@/test/factories/chat/private/make-private-v-card-message.js'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact.js'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message.js'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository.js'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository.js'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository.js'
import { FakeDateService } from '@/test/services/chat/fake-date-service.js'
import { CreateContactFromWAContactUseCase } from '../../../contacts/create-contact-from-wa-contact-use-case.js'
import { CreatePrivateVCardMessageFromWAMessageUseCase } from '../create-private-v-card-message-from-wa-message-use-case.js'

describe('CreatePrivateVCardMessageFromWAMessageUseCase', () => {
  let chatsRepository: InMemoryChatsRepository
  let messagesRepository: InMemoryMessagesRepository
  let contactsRepository: InMemoryContactsRepository

  let createContactFromWAContact: CreateContactFromWAContactUseCase

  let dateService: FakeDateService

  let sut: CreatePrivateVCardMessageFromWAMessageUseCase

  let chat: PrivateChat

  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    messagesRepository = new InMemoryMessagesRepository()
    contactsRepository = new InMemoryContactsRepository()

    createContactFromWAContact = new CreateContactFromWAContactUseCase(
      contactsRepository
    )

    dateService = new FakeDateService()

    sut = new CreatePrivateVCardMessageFromWAMessageUseCase(
      chatsRepository,
      messagesRepository,
      contactsRepository,
      createContactFromWAContact,
      dateService
    )

    chat = makePrivateChat()
    chatsRepository.items.push(chat)
  })

  it('should be able to create a private vcard message', async () => {
    const response = await sut.execute({
      waMessage: makeWAPrivateMessage({
        instanceId: chat.instanceId,
        waChatId: chat.waChatId,
        type: 'vcard',
        contacts: [makeWAPrivateContact({ instanceId: chat.instanceId })],
      }),
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    expect(messagesRepository.items).toHaveLength(1)
    expect(contactsRepository.items).toHaveLength(1)
  })

  it('should be able to create a private vcard message with existing contact', async () => {
    const contact = makeContact({ instanceId: chat.instanceId })
    contactsRepository.items.push(contact)

    const createContactFromWAContactMock = vi.spyOn(
      createContactFromWAContact,
      'execute'
    )

    const response = await sut.execute({
      waMessage: makeWAPrivateMessage({
        instanceId: chat.instanceId,
        waChatId: chat.waChatId,
        type: 'vcard',
        contacts: [
          makeWAPrivateContact(
            { instanceId: contact.instanceId },
            contact.waContactId
          ),
        ],
      }),
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    expect(messagesRepository.items).toHaveLength(1)
    expect(contactsRepository.items).toHaveLength(1)
    expect(createContactFromWAContactMock).not.toHaveBeenCalled()
  })

  it('should be able to create a private vcard message quoting other message', async () => {
    const quotedMessage = makePrivateVCardMessage({
      chatId: chat.id,
      instanceId: chat.instanceId,
    })
    messagesRepository.items.push(quotedMessage)

    const response = await sut.execute({
      waMessage: makeWAPrivateMessage({
        instanceId: chat.instanceId,
        waChatId: chat.waChatId,
        type: 'vcard',
        contacts: [makeWAPrivateContact({ instanceId: chat.instanceId })],
        quoted: makeWAPrivateMessage(
          {
            type: 'vcard',
            contacts: [makeWAPrivateContact({ instanceId: chat.instanceId })],
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

    expect(message.quoted).toBeInstanceOf(PrivateMessage)
    expect(messagesRepository.items).toHaveLength(2)
  })
})
