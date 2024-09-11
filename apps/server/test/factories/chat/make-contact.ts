import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Contact,
  type ContactProps,
} from '@/domain/chat/enterprise/entities/contact'
import { faker } from '@/test/lib/faker'
import { makeUniqueEntityID } from '../make-unique-entity-id'
import { makeContactPhone } from './value-objects/make-contact-phone'
import { makeWAEntityID } from './value-objects/make-wa-entity-id'

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
