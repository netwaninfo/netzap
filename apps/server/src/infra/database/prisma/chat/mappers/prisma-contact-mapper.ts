import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Contact } from '@/domain/chat/enterprise/entities/contact'
import { ContactPhone } from '@/domain/chat/enterprise/entities/value-objects/contact-phone'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import {
  Prisma,
  Contact as PrismaContact,
  ContactInstance as PrismaContactInstance,
} from '@prisma/client'

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
      id: contact.id.toString(),
      formattedPhone: contact.phone.formattedNumber,
      phone: contact.phone.number,
      isInstance: contact.isInstance,
      name: contact.name,
      waContactId: contact.waContactId.toString(),
      imageUrl: contact.imageUrl,
      instances: {
        create: {
          instanceId: contact.instanceId.toString(),
          isMe: contact.isMe,
          isMyContact: contact.isMyContact,
        },
      },
    }
  }
}
