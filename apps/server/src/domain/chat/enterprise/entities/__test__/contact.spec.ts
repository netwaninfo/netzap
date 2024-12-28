import { faker } from '@/test/lib/faker.js'

import { makeContactPhone } from '@/test/factories/chat/value-objects/make-contact-phone.js'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { Contact } from '../contact.js'

describe('Contact', () => {
  it('should be able to create', () => {
    const contact = Contact.create({
      name: faker.person.firstName(),
      instanceId: makeUniqueEntityID(),
      waContactId: makeWAEntityID(),
      phone: makeContactPhone(),
    })

    expect(contact).toBeTruthy()
  })
})
