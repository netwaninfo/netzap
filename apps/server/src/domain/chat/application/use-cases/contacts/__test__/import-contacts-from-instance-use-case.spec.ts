import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { FakeWhatsAppService } from '@/test/services/chat/fake-whats-app-service'
import { each } from '@/test/utilities/each'
import { CreateContactsFromWAContactsUseCase } from '../create-contacts-from-wa-contacts-use-case'
import { ImportContactsFromInstanceUseCase } from '../import-contacts-from-instance-use-case'

describe('ImportContactsFromInstanceUseCase', () => {
  let contactsRepository: InMemoryContactsRepository
  let createContactsFromWAContacts: CreateContactsFromWAContactsUseCase
  let whatsAppService: FakeWhatsAppService

  let sut: ImportContactsFromInstanceUseCase

  beforeEach(() => {
    contactsRepository = new InMemoryContactsRepository()

    createContactsFromWAContacts = new CreateContactsFromWAContactsUseCase(
      contactsRepository
    )
    whatsAppService = new FakeWhatsAppService()

    sut = new ImportContactsFromInstanceUseCase(
      createContactsFromWAContacts,
      whatsAppService
    )
  })

  it('should be able to import contacts from instance', async () => {
    const instanceId = makeUniqueEntityID()

    const waPrivateContacts = each(2).map(() =>
      makeWAPrivateContact({ instanceId })
    )
    whatsAppService.contacts.push(...waPrivateContacts)

    const response = await sut.execute({
      instanceId,
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    expect(contactsRepository.items).toHaveLength(2)
  })
})