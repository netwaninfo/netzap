import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { CreateContactFromWAContactUseCase } from '../create-contact-from-wa-contact-use-case'

describe('CreateContactFromWAContactUseCase', () => {
  let contactsRepository: InMemoryContactsRepository

  let sut: CreateContactFromWAContactUseCase

  beforeEach(() => {
    contactsRepository = new InMemoryContactsRepository()

    sut = new CreateContactFromWAContactUseCase(contactsRepository)
  })

  it('should be able to create contact from wa contact', async () => {
    const waContact = makeWAPrivateContact()

    const response = await sut.execute({ waContact })

    expect(response.isSuccess()).toBe(true)
    expect(contactsRepository.items).toHaveLength(1)
  })
})
