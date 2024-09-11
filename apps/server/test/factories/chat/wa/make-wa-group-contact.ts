import type { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import {
  WAGroupContact,
  type WAGroupContactProps,
} from '@/domain/chat/enterprise/entities/wa/group/contact'
import { faker } from '@/test/lib/faker'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'

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
