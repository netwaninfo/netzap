import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  Contact,
  type ContactProps,
} from '@/domain/chat/enterprise/entities/contact.js'
import { faker } from '@/test/lib/faker.js'
import { makeUniqueEntityID } from '../make-unique-entity-id.js'
import { makeContactPhone } from './value-objects/make-contact-phone.js'
import { makeWAEntityID } from './value-objects/make-wa-entity-id.js'

export function makeContact(
  override: Partial<ContactProps> = {},
  id?: UniqueEntityID
) {
  return Contact.create(
    {
      name: faker.person.firstName(),
      waContactId: makeWAEntityID(),
      phone: makeContactPhone(),
      instanceId: makeUniqueEntityID(),
      ...override,
    },
    id
  )
}
