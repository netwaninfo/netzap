import { faker } from '@faker-js/faker'
import { ContactPhone } from '../contact-phone'

describe('ContactPhone', () => {
  it('should be able to create', () => {
    const phone = ContactPhone.create({
      number: faker.phone.number(),
      formattedNumber: faker.phone.number(),
    })

    expect(phone).toBeTruthy()
  })
})
