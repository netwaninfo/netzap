import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Contact } from '@/domain/chat/enterprise/entities/contact'
import { ContactPhone } from '@/domain/chat/enterprise/entities/value-objects/contact-phone'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import {
  Prisma,
  Contact as PrismaContact,
  type ContactInstance as PrismaContactInstance,
} from '@prisma/client'
import { PrismaContactMapper } from './prisma-contact-mapper'

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
        name: raw.name,
        phone: ContactPhone.create({
          formattedNumber: contact.formattedPhone,
          number: contact.phone,
        }),
        imageUrl: contact.imageUrl,
        isInstance: contact.isInstance,
        isMe: raw.isMe,
        isMyContact: raw.isMyContact,
      },
      UniqueEntityID.create(raw.id)
    )
  }

  static toPrismaCreate(contact: Contact): Prisma.ContactInstanceCreateInput {
    return {
      id: contact.id.toString(),
      instanceId: contact.instanceId.toString(),
      isMe: contact.isMe,
      isMyContact: contact.isMyContact,
      name: contact.name,
      contact: {
        connectOrCreate: {
          where: {
            waContactId: contact.waContactId.toString(),
          },
          create: PrismaContactMapper.toPrismaCreate(contact),
        },
      },
    }
  }
}
