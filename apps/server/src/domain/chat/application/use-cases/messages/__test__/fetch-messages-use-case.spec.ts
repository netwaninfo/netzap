import { makeGroupTextMessage } from '@/test/factories/chat/group/make-group-text-message.js'
import { makePrivateTextMessage } from '@/test/factories/chat/private/make-private-text-message.js'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository.js'
import { each } from '@/test/utilities/each.js'
import { FetchMessagesUseCase } from '../fetch-messages-use-case.js'

describe('FetchMessagesUseCase', () => {
  let messagesRepository: InMemoryMessagesRepository

  let sut: FetchMessagesUseCase

  beforeEach(() => {
    messagesRepository = new InMemoryMessagesRepository()

    sut = new FetchMessagesUseCase(messagesRepository)
  })

  it('should be able to fetch messages', async () => {
    const instanceId = makeUniqueEntityID()
    const waChatId = makeWAEntityID()

    messagesRepository.items.push(
      ...each(2).map(() => makePrivateTextMessage({ instanceId, waChatId })),
      ...each(2).map(() => makeGroupTextMessage({ instanceId, waChatId }))
    )

    const response = await sut.execute({
      instanceId,
      waChatId,
      page: 1,
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { messages } = response.value
    expect(messages).toHaveLength(4)
  })
})
