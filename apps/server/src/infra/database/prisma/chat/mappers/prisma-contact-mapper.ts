import { Contact } from '@/domain/chat/enterprise/entities/contact'
import { Prisma } from '@prisma/client'

export class PrismaContactMapper {
	static toPrismaCreate(contact: Contact): Prisma.ContactUncheckedCreateInput {
		return {
			id: contact.id.toString(),
			formattedPhone: contact.phone.formattedNumber,
			phone: contact.phone.number,
			isInstance: contact.isInstance,
			name: contact.name,
			waContactId: contact.waContactId.toString(),
			imageUrl: contact.imageUrl,
			records: {
				connectOrCreate: {
					create: {
						instanceId: contact.instanceId.toString(),
						isMe: contact.isMe,
						isMyContact: contact.isMyContact,
					},
					where: {
						instanceId_waContactId: {
							instanceId: contact.instanceId.toString(),
							waContactId: contact.waContactId.toString(),
						},
					},
				},
			},
		}
	}
}
