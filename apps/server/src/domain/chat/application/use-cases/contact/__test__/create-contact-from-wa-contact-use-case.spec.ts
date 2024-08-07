import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { InMemoryContactsRepository } from '@/test/repositories/chat/in-memory-contacts-repository'
import { CreateContactFromWAContact } from '../create-contact-from-wa-contact-use-case'

describe('CreateContactFromWAContact', () => {
	let contactsRepository: InMemoryContactsRepository

	let sut: CreateContactFromWAContact

	beforeEach(() => {
		contactsRepository = new InMemoryContactsRepository()

		sut = new CreateContactFromWAContact(contactsRepository)
	})

	it('should be able to create contact from wa contact', async () => {
		const waContact = makeWAPrivateContact()

		const result = await sut.execute({ waContact })

		expect(result.isSuccess()).toBe(true)
		expect(contactsRepository.items).toHaveLength(1)
	})
})
