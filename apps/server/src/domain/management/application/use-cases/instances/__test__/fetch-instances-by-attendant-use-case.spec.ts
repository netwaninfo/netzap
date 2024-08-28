import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { makeInstance } from '@/test/factories/management/make-instance'
import { InMemoryInstancesRepository } from '@/test/repositories/management/in-memory-instances-repository'
import { each } from '@/test/utilities/each'
import { FetchInstancesByAttendantUseCase } from '../fetch-instances-by-attendant-use-case'

describe('FetchInstancesByAttendantUseCase', () => {
	let instancesRepository: InMemoryInstancesRepository

	let sut: FetchInstancesByAttendantUseCase

	beforeEach(() => {
		instancesRepository = new InMemoryInstancesRepository()

		sut = new FetchInstancesByAttendantUseCase(instancesRepository)
	})

	it('should be able to fetch instances by attendant', async () => {
		instancesRepository.items.push(...each(2).map(() => makeInstance()))

		const response = await sut.execute({
			page: 1,
			attendantId: makeUniqueEntityID(),
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { instances } = response.value
		expect(instances).toHaveLength(2)
	})
})
