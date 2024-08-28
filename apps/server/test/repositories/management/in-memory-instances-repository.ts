import type {
	InstancesRepository,
	InstancesRepositoryCountByAttendantIdParams,
	InstancesRepositoryFindManyByAttendantIdParams,
	InstancesRepositoryFindUniqueByInstanceIdParams,
} from '@/domain/management/application/repositories/instances-repository'
import type { Instance } from '@/domain/management/enterprise/entities/instance'

export class InMemoryInstancesRepository implements InstancesRepository {
	items: Instance[] = []

	async findUniqueByInstanceId({
		instanceId,
	}: InstancesRepositoryFindUniqueByInstanceIdParams): Promise<Instance | null> {
		const item = this.items.find((item) => item.id.equals(instanceId))

		return item ?? null
	}

	async findManyByAttendantId(
		params: InstancesRepositoryFindManyByAttendantIdParams,
	): Promise<Instance[]> {
		return this.items
	}

	async countByAttendantId(
		params: InstancesRepositoryCountByAttendantIdParams,
	): Promise<number> {
		return this.items.length
	}

	async save(instance: Instance): Promise<void> {
		const itemIndex = this.items.findIndex(
			(item) => item.id.toString() === instance.id.toString(),
		)

		this.items[itemIndex] = instance
	}
}
