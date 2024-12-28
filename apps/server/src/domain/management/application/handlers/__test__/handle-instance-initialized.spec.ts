import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { makeInstance } from '@/test/factories/management/make-instance.js'
import { InMemoryInstancesRepository } from '@/test/repositories/management/in-memory-instances-repository.js'
import { HandleInstanceInitialized } from '../handle-instance-initialized.js'

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

    const response = await sut.execute({ instanceId })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { instance } = response.value
    expect(instance.state).toBe('initialized')
  })
})
