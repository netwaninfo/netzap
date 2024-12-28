import type { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import {
  WAGroupContact,
  type WAGroupContactProps,
} from '@/domain/chat/enterprise/entities/wa/group/contact.js'
import { faker } from '@/test/lib/faker.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'

export const makeWAGroupContact = (
  override: Partial<WAGroupContactProps> = {},
  id: WAEntityID = makeWAEntityID()
) => {
  return WAGroupContact.create(
    {
      instanceId: makeUniqueEntityID(),
      name: faker.person.fullName(),
      shortName: faker.person.firstName(),
      pushName: faker.person.lastName(),
      number: faker.helpers.fromRegExp(/[0-9]{13}/),
      imageUrl: faker.internet.url(),
      formattedNumber: faker.phone.number(),
      ...override,
    },
    id
  )
}
