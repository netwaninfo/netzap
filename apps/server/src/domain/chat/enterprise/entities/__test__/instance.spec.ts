import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { faker } from '@/test/lib/faker'
import { Instance } from '../instance'

describe('Instance', () => {
  it('should be able to create', () => {
    const instance = Instance.create({
      name: faker.company.name(),
      phone: faker.phone.number(),
      status: 'stopped',
      attendantId: makeUniqueEntityID(),
    })

    expect(instance).toBeTruthy()
  })
})
