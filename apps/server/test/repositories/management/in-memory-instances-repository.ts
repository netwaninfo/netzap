import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { InstancesRepository } from '@/domain/management/application/repositories/instances-repository'
import type { Instance } from '@/domain/management/enterprise/entities/instance'

export class InMemoryInstancesRepository implements InstancesRepository {
	items: Instance[] = []

	async findUniqueById(id: UniqueEntityID): Promise<Instance | null> {
		const item = this.items.find((item) => item.id.equals(id))

		return item ?? null
	}

	async save(instance: Instance): Promise<void> {
		const itemIndex = this.items.findIndex(
			(item) => item.id.toString() === instance.id.toString(),
		)

		this.items[itemIndex] = instance
	}
}
