import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { makeInstance } from '@/test/factories/management/make-instance'
import { InMemoryInstancesRepository } from '@/test/repositories/management/in-memory-instances-repository'
import { HandleInstanceStopped } from '../handle-instance-stopped'

describe('HandleInstanceStopped', () => {
	let instancesRepository: InMemoryInstancesRepository

	let sut: HandleInstanceStopped

	beforeEach(() => {
		instancesRepository = new InMemoryInstancesRepository()

		sut = new HandleInstanceStopped(instancesRepository)
	})

	it('should be able to update instance to stopped', async () => {
		const instanceId = makeUniqueEntityID()
		instancesRepository.items.push(makeInstance({}, instanceId))

		const response = await sut.execute({ instanceId })

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { instance } = response.value
		expect(instance.status).toBe('stopped')
		expect(instance.qrCode).toBe(null)
	})
})
