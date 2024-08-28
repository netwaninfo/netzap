import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PaginationParams } from '@/domain/shared/repositories/pagination-params'
import type { Instance } from '../../enterprise/entities/instance'

export interface InstancesRepositoryFindUniqueByInstanceIdParams {
	instanceId: UniqueEntityID
}

export interface InstancesRepositoryFindManyByAttendantIdParams
	extends PaginationParams {
	attendantId: UniqueEntityID
}

export interface InstancesRepositoryCountByAttendantIdParams {
	attendantId: UniqueEntityID
}

export abstract class InstancesRepository {
	abstract findUniqueByInstanceId(
		params: InstancesRepositoryFindUniqueByInstanceIdParams,
	): Promise<Instance | null>

	abstract findManyByAttendantId(
		params: InstancesRepositoryFindManyByAttendantIdParams,
	): Promise<Instance[]>

	abstract countByAttendantId(
		params: InstancesRepositoryCountByAttendantIdParams,
	): Promise<number>

	abstract save(instance: Instance): Promise<void>
}
