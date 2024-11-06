import { faker } from '@/test/lib/faker'
import { Attendant } from '../attendant'

describe('Attendant', () => {
  it('should be able to create', () => {
    const attendant = Attendant.create({
      displayName: faker.internet.username(),
    })

    expect(attendant).toBeTruthy()
  })
})
