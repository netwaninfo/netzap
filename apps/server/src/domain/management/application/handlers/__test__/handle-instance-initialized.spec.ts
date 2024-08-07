import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { makeInstance } from '@/test/factories/management/make-instance'
import { faker } from '@/test/lib/faker'
import { InMemoryInstancesRepository } from '@/test/repositories/management/in-memory-instances-repository'
import { HandleInstanceInitialized } from '../handle-instance-initialized'

describe('HandleInstanceInitialized', () => {
	let instancesRepository: InMemoryInstancesRepository

	let sut: HandleInstanceInitialized

	beforeEach(() => {
		instancesRepository = new InMemoryInstancesRepository()

		sut = new HandleInstanceInitialized(instancesRepository)
	})

	it('should be able to update instance to initialized', async () => {
		const instanceId = makeUniqueEntityID()
		instancesRepository.items.push(makeInstance({ qrCode: null }, instanceId))

		const qrCode = faker.string.hexadecimal()
		const result = await sut.execute({ instanceId, qrCode })

		expect(result.isSuccess()).toBe(true)
		if (result.isFailure()) return

		const { instance } = result.value
		expect(instance.qrCode).toBe(qrCode)
	})
})
