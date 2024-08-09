import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { makeInstance } from '@/test/factories/management/make-instance'
import { InMemoryInstancesRepository } from '@/test/repositories/management/in-memory-instances-repository'
import { HandleInstanceDisconnected } from '../handle-instance-disconnected'

describe('HandleInstanceDisconnected', () => {
	let instancesRepository: InMemoryInstancesRepository

	let sut: HandleInstanceDisconnected

	beforeEach(() => {
		instancesRepository = new InMemoryInstancesRepository()

		sut = new HandleInstanceDisconnected(instancesRepository)
	})

	it('should be able to update instance to disconnected', async () => {
		const instanceId = makeUniqueEntityID()
		instancesRepository.items.push(makeInstance({}, instanceId))

		const response = await sut.execute({ instanceId })

		expect(response.isSuccess()).toBe(true)
		if (response.isFailure()) return

		const { instance } = response.value
		expect(instance.status).toBe('disconnected')
		expect(instance.qrCode).toBe(null)
	})
})
