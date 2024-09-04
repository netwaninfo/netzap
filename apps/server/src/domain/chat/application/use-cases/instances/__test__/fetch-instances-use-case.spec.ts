import { makeInstance } from '@/test/factories/chat/make-instance'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { InMemoryInstancesRepository } from '@/test/repositories/chat/in-memory-instances-repository'
import { each } from '@/test/utilities/each'
import { FetchInstancesUseCase } from '../fetch-instances-use-case'

describe('FetchInstancesUseCase', () => {
	let instancesRepository: InMemoryInstancesRepository

	let sut: FetchInstancesUseCase

	beforeEach(() => {
		instancesRepository = new InMemoryInstancesRepository()

		sut = new FetchInstancesUseCase(instancesRepository)
	})

	it('should be able to fetch instances by attendant', async () => {
		const attendantId = makeUniqueEntityID()
		instancesRepository.items.push(
			...each(2).map(() => makeInstance({ attendantId })),
		)

		const response = await sut.execute({
			page: 1,
			attendantId,
		})

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { instances } = response.value
		expect(instances).toHaveLength(2)
	})
})
