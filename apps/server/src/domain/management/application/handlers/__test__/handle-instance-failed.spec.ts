import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { makeInstance } from '@/test/factories/management/make-instance'
import { InMemoryInstancesRepository } from '@/test/repositories/management/in-memory-instances-repository'
import { HandleInstanceFailed } from '../handle-instance-failed'

describe('HandleInstanceFailed', () => {
	let instancesRepository: InMemoryInstancesRepository

	let sut: HandleInstanceFailed

	beforeEach(() => {
		instancesRepository = new InMemoryInstancesRepository()

		sut = new HandleInstanceFailed(instancesRepository)
	})

	it('should be able to update instance to failed', async () => {
		const instanceId = makeUniqueEntityID()
		instancesRepository.items.push(makeInstance({}, instanceId))

		const result = await sut.execute({ instanceId })

		expect(result.isSuccess()).toBe(true)
		if (result.isFailure()) return

		const { instance } = result.value
		expect(instance.status).toBe('failed')
		expect(instance.qrCode).toBe(null)
	})
})
