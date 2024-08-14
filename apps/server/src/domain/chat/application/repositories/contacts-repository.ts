import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { PaginationParams } from '@/domain/shared/repositories/pagination-params'
import type { SearchParams } from '@/domain/shared/repositories/search-params'
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

export interface ContactsRepositoryFindManyPaginatedByInstanceIdParams
	extends PaginationParams,
		SearchParams {
	instanceId: UniqueEntityID
}

export interface ContactsRepositoryCountByInstanceIdParams
	extends SearchParams {
	instanceId: UniqueEntityID
}

export abstract class ContactsRepository {
	abstract findUniqueByWAContactIdAndInstanceId(
		params: ContactsRepositoryFindUniqueByWAContactIdAndInstanceIdParams,
	): Promise<Contact | null>

	abstract findManyByWAContactIdsAndInstanceId(
		params: ContactsRepositoryFindManyByWAContactIdsAndInstanceIdParams,
	): Promise<Contact[]>

	abstract findManyPaginatedByInstanceId(
		params: ContactsRepositoryFindManyPaginatedByInstanceIdParams,
	): Promise<Contact[]>

	abstract countByInstanceId(
		params: ContactsRepositoryCountByInstanceIdParams,
	): Promise<number>

	abstract create(contact: Contact): Promise<void>

	abstract createMany(contacts: Contact[]): Promise<void>
}
