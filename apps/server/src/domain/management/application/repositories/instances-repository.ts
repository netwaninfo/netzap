import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Instance } from '../../enterprise/entities/instance'

export interface InstancesRepositoryFindUniqueByInstanceIdParams {
	instanceId: UniqueEntityID
}

export abstract class InstancesRepository {
	abstract findUniqueByInstanceId(
		params: InstancesRepositoryFindUniqueByInstanceIdParams,
	): Promise<Instance | null>

	abstract save(instance: Instance): Promise<void>
}
