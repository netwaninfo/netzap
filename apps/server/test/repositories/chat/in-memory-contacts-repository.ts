import type {
	ContactsRepository,
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

	async create(contact: Contact): Promise<void> {
		this.items.push(contact)
	}
}
