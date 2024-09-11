import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Group } from '../../enterprise/entities/group'
import type { WAEntityID } from '../../enterprise/entities/value-objects/wa-entity-id'

export interface GroupsRepositoryFindUniqueByWAGroupIdAndInstanceIdParams {
  waGroupId: WAEntityID
  instanceId: UniqueEntityID
}

export abstract class GroupsRepository {
  abstract findUniqueByWAGroupIdAndInstanceId(
    params: GroupsRepositoryFindUniqueByWAGroupIdAndInstanceIdParams
  ): Promise<Group | null>

  abstract create(group: Group): Promise<void>
}
