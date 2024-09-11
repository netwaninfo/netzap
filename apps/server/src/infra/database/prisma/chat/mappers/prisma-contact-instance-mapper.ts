import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Contact } from '@/domain/chat/enterprise/entities/contact'
import { ContactPhone } from '@/domain/chat/enterprise/entities/value-objects/contact-phone'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import {
  Contact as PrismaContact,
  type ContactInstance as PrismaContactInstance,
} from '@prisma/client'

export type Raw = PrismaContactInstance & {
  contact: PrismaContact
}

export class PrismaContactInstanceMapper {
  static toDomain(raw: Raw): Contact {
    const { contact } = raw

    return Contact.create(
      {
        instanceId: UniqueEntityID.create(raw.instanceId),
        waContactId: WAEntityID.createFromString(contact.waContactId),
        name: contact.name,
        phone: ContactPhone.create({
          formattedNumber: contact.formattedPhone,
          number: contact.phone,
        }),
        imageUrl: contact.imageUrl,
        isInstance: contact.isInstance,
        isMe: raw.isMe,
        isMyContact: raw.isMyContact,
      },
      UniqueEntityID.create(raw.contact.id)
    )
  }
}
