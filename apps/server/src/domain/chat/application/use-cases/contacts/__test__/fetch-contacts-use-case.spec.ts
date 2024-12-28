import { makeContact } from '@/test/factories/chat/make-contact.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository.js'
import { each } from '@/test/utilities/each.js'
import { FetchContactsUseCase } from '../fetch-contacts-use-case.js'

describe('FetchContactsUseCase', () => {
  let contactsRepository: InMemoryContactsRepository

  let sut: FetchContactsUseCase

  beforeEach(() => {
    contactsRepository = new InMemoryContactsRepository()

    sut = new FetchContactsUseCase(contactsRepository)
  })

  it('should be able to fetch contacts', async () => {
    const instanceId = makeUniqueEntityID()

    contactsRepository.items.push(
      ...each(2).map(() => makeContact({ instanceId }))
    )

    const response = await sut.execute({
      instanceId,
      page: 1,
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { contacts } = response.value
    expect(contacts).toHaveLength(2)
  })
})
