import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { faker } from '@/test/lib/faker.js'
import { WAPrivateContact } from '../contact.js'

describe('WAPrivateContact', () => {
  it('should be able to create', () => {
    const waContact = WAPrivateContact.create(
      {
        name: faker.person.fullName(),
        shortName: faker.person.firstName(),
        pushName: faker.person.lastName(),
        number: faker.helpers.fromRegExp(/[0-9]{13}/),
        imageUrl: faker.internet.url(),
        formattedNumber: faker.phone.number(),
        isBusiness: faker.datatype.boolean(),
        isEnterprise: faker.datatype.boolean(),
        isMyContact: faker.datatype.boolean(),
        isWAContact: faker.datatype.boolean(),
        instanceId: makeUniqueEntityID(),
      },
      makeWAEntityID()
    )

    expect(waContact).toBeTruthy()
  })
})
