import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { makeInstance } from '@/test/factories/management/make-instance.js'
import { InMemoryInstancesRepository } from '@/test/repositories/management/in-memory-instances-repository.js'
import { HandleInstanceStopped } from '../handle-instance-stopped.js'

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
    expect(instance.state).toBe('stopped')
    expect(instance.qrCode).toBe(null)
  })
})
