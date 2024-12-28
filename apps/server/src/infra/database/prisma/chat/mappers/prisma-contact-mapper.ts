import {
  Prisma,
  type Contact as PrismaContact,
  type ContactInstance as PrismaContactInstance,
} from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { Contact } from '@/domain/chat/enterprise/entities/contact.js'
import { ContactPhone } from '@/domain/chat/enterprise/entities/value-objects/contact-phone.js'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'

export type Raw = PrismaContact & {
  instances: PrismaContactInstance[]
}

export class PrismaContactMapper {
  static toDomain(raw: Raw): Contact {
    const instance = raw.instances.at(-1)

    if (!instance) {
      throw new Error('Missing instances in Contact')
    }

    return Contact.create(
      {
        instanceId: UniqueEntityID.create(instance.instanceId),
        waContactId: WAEntityID.createFromString(raw.waContactId),
        name: raw.name,
        phone: ContactPhone.create({
          formattedNumber: raw.formattedPhone,
          number: raw.phone,
        }),
        imageUrl: raw.imageUrl,
        isInstance: raw.isInstance,
        isMe: instance.isMe,
        isMyContact: instance.isMyContact,
      },
      UniqueEntityID.create(raw.id)
    )
  }

  static toPrismaCreate(contact: Contact): Prisma.ContactUncheckedCreateInput {
    return {
      formattedPhone: contact.phone.formattedNumber,
      phone: contact.phone.number,
      isInstance: contact.isInstance,
      name: contact.name,
      waContactId: contact.waContactId.toString(),
      imageUrl: contact.imageUrl,
    }
  }
}
