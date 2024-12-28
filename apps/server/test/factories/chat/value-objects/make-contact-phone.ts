import {
  ContactPhone,
  type ContactPhoneProps,
} from '@/domain/chat/enterprise/entities/value-objects/contact-phone.js'
import { faker } from '@/test/lib/faker.js'

export function makeContactPhone(override?: Partial<ContactPhoneProps>) {
  return ContactPhone.create({
    number: faker.helpers.fromRegExp(/[0-9]{13}/),
    formattedNumber: faker.phone.imei(),
    ...override,
  })
}
