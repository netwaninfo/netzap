import type {
  GroupsRepository,
  GroupsRepositoryFindUniqueByWAGroupIdAndInstanceIdParams,
} from '@/domain/chat/application/repositories/groups-repository.js'
import type { Group } from '@/domain/chat/enterprise/entities/group.js'

export class InMemoryGroupsRepository implements GroupsRepository {
  items: Group[] = []

  async findUniqueByWAGroupIdAndInstanceId({
    instanceId,
    waGroupId,
  }: GroupsRepositoryFindUniqueByWAGroupIdAndInstanceIdParams): Promise<Group | null> {
    const item = this.items.find(
      item =>
        item.waGroupId.equals(waGroupId) && item.instanceId.equals(instanceId)
    )

    return item ?? null
  }

  async create(group: Group): Promise<void> {
    this.items.push(group)
  }
}
