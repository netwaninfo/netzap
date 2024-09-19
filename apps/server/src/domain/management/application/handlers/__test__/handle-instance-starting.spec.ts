import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { makeInstance } from '@/test/factories/management/make-instance'
import { InMemoryInstancesRepository } from '@/test/repositories/management/in-memory-instances-repository'
import { HandleInstanceStarting } from '../handle-instance-starting'

describe('HandleInstanceStarting', () => {
  let instancesRepository: InMemoryInstancesRepository

  let sut: HandleInstanceStarting

  beforeEach(() => {
    instancesRepository = new InMemoryInstancesRepository()

    sut = new HandleInstanceStarting(instancesRepository)
  })

  it('should be able to update instance to starting', async () => {
    const instanceId = makeUniqueEntityID()
    instancesRepository.items.push(makeInstance({}, instanceId))

    const response = await sut.execute({ instanceId })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { instance } = response.value
    expect(instance.state).toBe('starting')
    expect(instance.qrCode).toBe(null)
  })
})
