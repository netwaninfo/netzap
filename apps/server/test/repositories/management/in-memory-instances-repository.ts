import type {
  InstancesRepository,
  InstancesRepositoryFindUniqueByInstanceIdParams,
} from '@/domain/management/application/repositories/instances-repository.js'
import type { Instance } from '@/domain/management/enterprise/entities/instance.js'

export class InMemoryInstancesRepository implements InstancesRepository {
  items: Instance[] = []

  async findUniqueByInstanceId({
    instanceId,
  }: InstancesRepositoryFindUniqueByInstanceIdParams): Promise<Instance | null> {
    const item = this.items.find(item => item.id.equals(instanceId))

    return item ?? null
  }

  async create(instance: Instance): Promise<void> {
    this.items.push(instance)
  }

  async save(instance: Instance): Promise<void> {
    const itemIndex = this.items.findIndex(
      item => item.id.toString() === instance.id.toString()
    )

    this.items[itemIndex] = instance
  }
}
