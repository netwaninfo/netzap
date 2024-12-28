import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { faker } from '@/test/lib/faker.js'
import { WAGroupContact } from '../contact.js'

describe('WAGroupContact', () => {
  it('should be able to create', () => {
    const waContact = WAGroupContact.create(
      {
        name: faker.person.fullName(),
        shortName: faker.person.firstName(),
        pushName: faker.person.lastName(),
        number: faker.helpers.fromRegExp(/[0-9]{13}/),
        imageUrl: faker.internet.url(),
        formattedNumber: faker.phone.number(),
        instanceId: makeUniqueEntityID(),
      },
      makeWAEntityID()
    )

    expect(waContact).toBeTruthy()
  })
})
