import { type Either, success } from '@/core/either'
import type { Contact } from '@/domain/chat/enterprise/entities/contact'
import type { WAPrivateContact } from '@/domain/chat/enterprise/entities/wa/private/contact'
import type { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import type { ContactsRepository } from '../../repositories/contacts-repository'

interface CreateContactsFromWAContactsUseCaseRequest {
	waContacts: WAPrivateContact[]
}

type CreateContactsFromWAContactsUseCaseResponse = Either<
	ResourceAlreadyExistsError,
	{
		contacts: Contact[]
	}
>

export class CreateContactsFromWAContactsUseCase {
	constructor(private contactsRepository: ContactsRepository) {}

	async execute(
		request: CreateContactsFromWAContactsUseCaseRequest,
	): Promise<CreateContactsFromWAContactsUseCaseResponse> {
		const { waContacts } = request

		const [waContactsThatAreMine, waMyContactsThatAreNotMineYet] = [
			waContacts.filter((waContact) => waContact.isMyContact),
			waContacts.filter((waContact) => !waContact.isMyContact),
		]

		return success({ contacts: [] })
	}
}
