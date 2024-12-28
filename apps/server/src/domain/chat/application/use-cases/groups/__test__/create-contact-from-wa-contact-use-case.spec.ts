import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact.js'
import { InMemoryGroupsRepository } from '@/test/repositories/chat/in-memory-groups-repository.js'
import { CreateGroupFromWAContactUseCase } from '../create-group-from-wa-contact-use-case.js'

describe('CreateGroupFromWAContactUseCase', () => {
  let groupsRepository: InMemoryGroupsRepository

  let sut: CreateGroupFromWAContactUseCase

  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository()

    sut = new CreateGroupFromWAContactUseCase(groupsRepository)
  })

  it('should be able to create group from wa contact', async () => {
    const waContact = makeWAPrivateContact()

    const response = await sut.execute({ waContact })

    expect(response.isSuccess()).toBe(true)
    expect(groupsRepository.items).toHaveLength(1)
  })
})
