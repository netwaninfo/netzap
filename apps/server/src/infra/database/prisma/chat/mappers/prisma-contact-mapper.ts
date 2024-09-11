import { Contact } from '@/domain/chat/enterprise/entities/contact'
import { Prisma } from '@prisma/client'

export class PrismaContactMapper {
  static toPrisma(contact: Contact): Prisma.ContactUncheckedCreateInput {
    return {
      id: contact.id.toString(),
      formattedPhone: contact.phone.formattedNumber,
      phone: contact.phone.number,
      isInstance: contact.isInstance,
      name: contact.name,
      waContactId: contact.waContactId.toString(),
      imageUrl: contact.imageUrl,
      instances: {
        connectOrCreate: {
          create: {
            instanceId: contact.instanceId.toString(),
            isMe: contact.isMe,
            isMyContact: contact.isMyContact,
          },
          where: {
            contactId_instanceId: {
              contactId: contact.id.toString(),
              instanceId: contact.instanceId.toString(),
            },
          },
        },
      },
    }
  }
}
