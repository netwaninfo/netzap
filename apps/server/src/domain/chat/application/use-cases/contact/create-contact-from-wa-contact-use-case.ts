import { type Either, failure, success } from '@/core/either'
import { Contact } from '@/domain/chat/enterprise/entities/contact'
import type { WAPrivateContact } from '@/domain/chat/enterprise/entities/wa/private/contact'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import type { ContactsRepository } from '../../repositories/contacts-repository'

interface CreateContactFromWAContactRequest {
	waContact: WAPrivateContact
}

type CreateContactFromWAContactResponse = Either<
	ResourceAlreadyExistsError,
	{
		contact: Contact
	}
>

export class CreateContactFromWAContact {
	constructor(private contactsRepository: ContactsRepository) {}

	async execute(
		request: CreateContactFromWAContactRequest,
	): Promise<CreateContactFromWAContactResponse> {
		const { waContact } = request

		const someContact =
			await this.contactsRepository.findUniqueByWAContactIdAndInstanceId({
				instanceId: waContact.instanceId,
				waContactId: waContact.id,
			})

		const hasSomeContact = !!someContact
		if (hasSomeContact) {
			return failure(new ResourceAlreadyExistsError({ id: waContact.ref }))
		}

		const contact = Contact.create({
			instanceId: waContact.instanceId,
			name: waContact.defaultName,
			phone: waContact.number,
			waContactId: waContact.id,
			imageUrl: waContact.imageUrl,
			isInstance: waContact.isInstance,
			isMe: waContact.isMe,
			isMyContact: waContact.isMyContact,
		})

		await this.contactsRepository.create(contact)

		return success({ contact })
	}
}
