import { Attendant, Contact, ContactInstance, Message } from '@prisma/client'
import { Except } from 'type-fest'

type PrismaContact = ContactInstance & {
	contact: Contact
}

type PrismaAttendant = Except<Attendant, 'instanceIds'>

export type PrismaMessage = Message & {
	quoted: Except<PrismaMessage, 'quoted'> | null
	sentBy: PrismaAttendant | null
	revokedBy: PrismaAttendant | null
	contacts: PrismaContact[]
	author: PrismaContact | null
}
