import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { faker } from '@/test/lib/faker.js'
import { Instance } from '../instance.js'

describe('Instance', () => {
  it('should be able to create', () => {
    const instance = Instance.create({
      name: faker.company.name(),
      phone: faker.phone.number(),
      status: 'disconnected',
      state: 'stopped',
      attendantId: makeUniqueEntityID(),
    })

    expect(instance).toBeTruthy()
  })
})
