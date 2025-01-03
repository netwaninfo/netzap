import { makeContact } from '@/test/factories/chat/make-contact.js'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository.js'
import { each } from '@/test/utilities/each.js'
import { CreateContactsFromWAContactsUseCase } from '../create-contacts-from-wa-contacts-use-case.js'

describe('CreateContactsFromWAContactsUseCase', () => {
  let contactsRepository: InMemoryContactsRepository

  let sut: CreateContactsFromWAContactsUseCase

  beforeEach(() => {
    contactsRepository = new InMemoryContactsRepository()

    sut = new CreateContactsFromWAContactsUseCase(contactsRepository)
  })

  it('should be able to create contacts from wa contacts', async () => {
    const instanceId = makeUniqueEntityID()
    const waContacts = each(3)
      .map(() =>
        makeWAPrivateContact({
          instanceId,
          isMyContact: true,
          isWAContact: true,
        })
      )
      .concat(
        each(2).map(() =>
          makeWAPrivateContact({
            instanceId,
            isMyContact: false,
            isWAContact: true,
          })
        )
      )

    contactsRepository.items.push(
      ...waContacts.slice(0, 2).map(waContact =>
        makeContact({
          instanceId: waContact.instanceId,
          waContactId: waContact.id,
        })
      )
    )

    const response = await sut.execute({ waContacts, instanceId })

    expect(response.isSuccess()).toBe(true)
    expect(contactsRepository.items).toHaveLength(5)
  })
})
