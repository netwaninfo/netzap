import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { makeInstance } from '@/test/factories/management/make-instance.js'
import { faker } from '@/test/lib/faker.js'
import { InMemoryInstancesRepository } from '@/test/repositories/management/in-memory-instances-repository.js'
import { HandleInstanceQRCodeChange } from '../handle-instance-qr-code-change.js'

describe('HandleInstanceQRCodeChange', () => {
  let instancesRepository: InMemoryInstancesRepository

  let sut: HandleInstanceQRCodeChange

  beforeEach(() => {
    instancesRepository = new InMemoryInstancesRepository()

    sut = new HandleInstanceQRCodeChange(instancesRepository)
  })

  it('should be able to update QR code', async () => {
    const instanceId = makeUniqueEntityID()
    instancesRepository.items.push(makeInstance({ qrCode: null }, instanceId))

    const response = await sut.execute({
      instanceId,
      qrCode: faker.string.hexadecimal(),
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { instance } = response.value
    expect(instance.qrCode).toBeTruthy()
  })
})
