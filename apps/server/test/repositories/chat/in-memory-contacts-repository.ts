import type {
	ContactsRepository,
	ContactsRepositoryFindManyByWAContactIdsAndInstanceIdParams,
	ContactsRepositoryFindUniqueByWAContactIdAndInstanceIdParams,
} from '@/domain/chat/application/repositories/contacts-repository'
import type { Contact } from '@/domain/chat/enterprise/entities/contact'

export class InMemoryContactsRepository implements ContactsRepository {
	items: Contact[] = []

	async findUniqueByWAContactIdAndInstanceId({
		instanceId,
		waContactId,
	}: ContactsRepositoryFindUniqueByWAContactIdAndInstanceIdParams): Promise<Contact | null> {
		const item = this.items.find(
			(item) =>
				item.waContactId.equals(waContactId) &&
				item.instanceId.equals(instanceId),
		)

		return item ?? null
	}

	async findManyByWAContactIdsAndInstanceId({
		instanceId,
		waContactIds,
	}: ContactsRepositoryFindManyByWAContactIdsAndInstanceIdParams): Promise<
		Contact[]
	> {
		return this.items.filter(
			(item) =>
				item.instanceId.equals(instanceId) &&
				waContactIds.some((id) => id.equals(item.waContactId)),
		)
	}

	async create(contact: Contact): Promise<void> {
		this.items.push(contact)
	}

	async createMany(contacts: Contact[]): Promise<void> {
		this.items.push(...contacts)
	}
}
