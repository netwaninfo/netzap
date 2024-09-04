import { Contact } from '@/domain/chat/enterprise/entities/contact'

import { ChatHttpContact } from '@netzap/contracts/http'

export class ContactPresenter {
	static toHttp(contact: Contact): ChatHttpContact {
		return {
			id: contact.id.toString(),
			imageUrl: contact.imageUrl,
			instanceId: contact.instanceId.toString(),
			isInstance: contact.isInstance,
			isMe: contact.isMe,
			isMyContact: contact.isMyContact,
			name: contact.name,
			phone: contact.phone.formattedNumber,
			waContactId: contact.waContactId.toString(),
		}
	}
}
