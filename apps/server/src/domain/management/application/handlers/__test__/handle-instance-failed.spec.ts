import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { makeInstance } from '@/test/factories/management/make-instance.js'
import { InMemoryInstancesRepository } from '@/test/repositories/management/in-memory-instances-repository.js'
import { HandleInstanceFailed } from '../handle-instance-failed.js'

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

    const response = await sut.execute({ instanceId })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { instance } = response.value
    expect(instance.state).toBe('failed')
    expect(instance.qrCode).toBe(null)
  })
})
