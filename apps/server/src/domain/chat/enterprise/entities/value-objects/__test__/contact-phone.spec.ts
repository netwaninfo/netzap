import { faker } from '@/test/lib/faker.js'
import { ContactPhone } from '../contact-phone.js'

describe('ContactPhone', () => {
  it('should be able to create', () => {
    const phone = ContactPhone.create({
      number: faker.phone.number(),
      formattedNumber: faker.phone.number(),
    })

    expect(phone).toBeTruthy()
  })
})
