import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Contact } from '../../enterprise/entities/contact'
import type { WAEntityID } from '../../enterprise/entities/value-objects/wa-entity-id'

export interface ContactsRepositoryFindUniqueByWAContactIdAndInstanceIdParams {
	waContactId: WAEntityID
	instanceId: UniqueEntityID
}

export interface ContactsRepositoryFindManyByWAContactIdsAndInstanceIdParams {
	waContactIds: WAEntityID[]
	instanceId: UniqueEntityID
}

export abstract class ContactsRepository {
	abstract findUniqueByWAContactIdAndInstanceId(
		params: ContactsRepositoryFindUniqueByWAContactIdAndInstanceIdParams,
	): Promise<Contact | null>

	abstract findManyByWAContactIdsAndInstanceId(
		params: ContactsRepositoryFindManyByWAContactIdsAndInstanceIdParams,
	): Promise<Contact[]>

	abstract create(contact: Contact): Promise<void>

	abstract createMany(contacts: Contact[]): Promise<void>
}
