import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Instance } from '../../enterprise/entities/instance'

export abstract class InstancesRepository {
	abstract findUniqueById(id: UniqueEntityID): Promise<Instance | null>

	abstract save(instance: Instance): Promise<void>
}
