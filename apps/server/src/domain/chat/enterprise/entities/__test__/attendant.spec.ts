import { faker } from '@/test/lib/faker.js'
import { Attendant } from '../attendant.js'

describe('Attendant', () => {
  it('should be able to create', () => {
    const attendant = Attendant.create({
      displayName: faker.internet.username(),
    })

    expect(attendant).toBeTruthy()
  })
})
