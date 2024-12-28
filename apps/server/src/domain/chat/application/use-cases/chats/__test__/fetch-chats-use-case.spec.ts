import { makeGroupChat } from '@/test/factories/chat/group/make-group-chat.js'
import { makePrivateChat } from '@/test/factories/chat/private/make-private-chat.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { InMemoryChatsRepository } from '@/test/repositories/chat/in-memory-chats-repository.js'
import { each } from '@/test/utilities/each.js'
import { FetchChatsUseCase } from '../fetch-chats-use-case.js'

describe('FetchChatsUseCase', () => {
  let chatsRepository: InMemoryChatsRepository

  let sut: FetchChatsUseCase

  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()

    sut = new FetchChatsUseCase(chatsRepository)
  })

  it('should be able to fetch chats', async () => {
    const instanceId = makeUniqueEntityID()

    chatsRepository.items.push(
      ...each(2).map(() => makePrivateChat({ instanceId })),
      makeGroupChat({ instanceId })
    )

    const response = await sut.execute({
      instanceId,
      page: 1,
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { chats } = response.value
    expect(chats).toHaveLength(3)
  })
})
