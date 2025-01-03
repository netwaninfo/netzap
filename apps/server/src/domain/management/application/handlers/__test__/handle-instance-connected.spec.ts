import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { makeInstance } from '@/test/factories/management/make-instance.js'
import { InMemoryInstancesRepository } from '@/test/repositories/management/in-memory-instances-repository.js'
import { HandleInstanceConnected } from '../handle-instance-connected.js'

describe('HandleInstanceConnected', () => {
  let instancesRepository: InMemoryInstancesRepository

  let sut: HandleInstanceConnected

  beforeEach(() => {
    instancesRepository = new InMemoryInstancesRepository()

    sut = new HandleInstanceConnected(instancesRepository)
  })

  it('should be able to update instance to connected', async () => {
    const instanceId = makeUniqueEntityID()
    instancesRepository.items.push(makeInstance({}, instanceId))

    const response = await sut.execute({ instanceId })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { instance } = response.value
    expect(instance.status).toBe('connected')
    expect(instance.qrCode).toBe(null)
  })
})
