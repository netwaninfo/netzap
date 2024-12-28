import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { makeInstance } from '@/test/factories/management/make-instance.js'
import { InMemoryInstancesRepository } from '@/test/repositories/management/in-memory-instances-repository.js'
import { HandleInstanceDisconnected } from '../handle-instance-disconnected.js'

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
