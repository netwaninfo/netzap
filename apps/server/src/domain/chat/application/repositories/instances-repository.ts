import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { PaginationParams } from '@/domain/shared/repositories/pagination-params.js'
import type { InstanceStatus } from '@netzap/entities/management'
import type { Instance } from '../../enterprise/entities/instance.js'

export interface InstancesRepositoryFindManyByAttendantIdParams
  extends PaginationParams {
  status?: InstanceStatus
  attendantId: UniqueEntityID
}

export interface InstancesRepositoryCountByAttendantIdParams {
  attendantId: UniqueEntityID
  status?: InstanceStatus
}

export abstract class InstancesRepository {
  abstract findManyByAttendantId(
    params: InstancesRepositoryFindManyByAttendantIdParams
  ): Promise<Instance[]>

  abstract countByAttendantId(
    params: InstancesRepositoryCountByAttendantIdParams
  ): Promise<number>
}
