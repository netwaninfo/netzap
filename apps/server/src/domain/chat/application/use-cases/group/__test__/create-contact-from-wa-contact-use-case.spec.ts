import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { InMemoryGroupsRepository } from '@/test/repositories/chat/in-memory-groups-repository'
import { CreateGroupFromWAContact } from '../create-group-from-wa-contact-use-case'

describe('CreateGroupFromWAContact', () => {
	let groupsRepository: InMemoryGroupsRepository

	let sut: CreateGroupFromWAContact

	beforeEach(() => {
		groupsRepository = new InMemoryGroupsRepository()

		sut = new CreateGroupFromWAContact(groupsRepository)
	})

	it('should be able to create group from wa contact', async () => {
		const waContact = makeWAPrivateContact()

		const result = await sut.execute({ waContact })

		expect(result.isSuccess()).toBe(true)
		expect(groupsRepository.items).toHaveLength(1)
	})
})
