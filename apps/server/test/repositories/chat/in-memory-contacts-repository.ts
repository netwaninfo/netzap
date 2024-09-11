import type {
  ContactsRepository,
  ContactsRepositoryCountByInstanceIdParams,
  ContactsRepositoryFindManyByWAContactIdsAndInstanceIdParams,
  ContactsRepositoryFindManyPaginatedByInstanceIdParams,
  ContactsRepositoryFindUniqueByWAContactIdAndInstanceIdParams,
} from '@/domain/chat/application/repositories/contacts-repository'
import type { Contact } from '@/domain/chat/enterprise/entities/contact'
import { Pagination } from '@/domain/shared/entities/pagination'

export class InMemoryContactsRepository implements ContactsRepository {
  items: Contact[] = []

  async findUniqueByWAContactIdAndInstanceId({
    instanceId,
    waContactId,
  }: ContactsRepositoryFindUniqueByWAContactIdAndInstanceIdParams): Promise<Contact | null> {
    const item = this.items.find(
      item =>
        item.waContactId.equals(waContactId) &&
        item.instanceId.equals(instanceId)
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
      item =>
        item.instanceId.equals(instanceId) &&
        waContactIds.some(id => id.equals(item.waContactId))
    )
  }

  async countByInstanceId({
    instanceId,
  }: ContactsRepositoryCountByInstanceIdParams): Promise<number> {
    return this.items.filter(item => item.instanceId.equals(instanceId)).length
  }

  async findManyPaginatedByInstanceId({
    instanceId,
    page,
    take,
  }: ContactsRepositoryFindManyPaginatedByInstanceIdParams): Promise<
    Contact[]
  > {
    return this.items
      .filter(item => item.instanceId.equals(instanceId))
      .slice(Pagination.skip({ limit: take, page }), page * take)
  }

  async create(contact: Contact): Promise<void> {
    this.items.push(contact)
  }

  async createMany(contacts: Contact[]): Promise<void> {
    this.items.push(...contacts)
  }
}
