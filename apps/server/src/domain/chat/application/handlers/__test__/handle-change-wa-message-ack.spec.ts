import { FakeMessageEmitter } from '@/test/emitters/chat/fake-message-emitter'
import { makePrivateTextMessage } from '@/test/factories/chat/private/make-private-text-message'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository'
import { HandleChangeWAMessageACK } from '../handle-change-wa-message-ack'

describe('HandleChangeWAMessageACK', () => {
  let messagesRepository: InMemoryMessagesRepository
  let messageEmitter: FakeMessageEmitter

  let sut: HandleChangeWAMessageACK

  beforeEach(() => {
    messagesRepository = new InMemoryMessagesRepository()
    messageEmitter = new FakeMessageEmitter()

    sut = new HandleChangeWAMessageACK(messagesRepository, messageEmitter)
  })

  it('should be able to update message from wa message ack', async () => {
    const instanceId = makeUniqueEntityID()
    const messageRef = makePrivateTextMessage({ instanceId })
    messagesRepository.items.push(messageRef)

    const waMessage = makeWAPrivateMessage(
      { instanceId, ack: 'pending' },
      messageRef.waMessageId
    )

    const response = await sut.execute({
      waMessage,
      ack: 'read',
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value

    expect(messagesRepository.items).toHaveLength(1)
    expect(message.status).toBe('read')
    expect(messageEmitter.items).toHaveLength(1)
  })
})
