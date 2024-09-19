import {
  InstancesRepository,
  InstancesRepositoryCountByAttendantIdParams,
  InstancesRepositoryFindManyByAttendantIdParams,
} from '@/domain/chat/application/repositories/instances-repository'
import { Instance } from '@/domain/chat/enterprise/entities/instance'
import { Pagination } from '@/domain/shared/entities/pagination'

export class InMemoryInstancesRepository implements InstancesRepository {
  items: Instance[] = []

  async findManyByAttendantId({
    attendantId,
    page,
    take,
  }: InstancesRepositoryFindManyByAttendantIdParams): Promise<Instance[]> {
    return this.items
      .filter(item => item.attendantId.equals(attendantId))
      .slice(Pagination.skip({ limit: take, page }), page * take)
  }

  async countByAttendantId({
    attendantId,
  }: InstancesRepositoryCountByAttendantIdParams): Promise<number> {
    return this.items.filter(item => item.attendantId.equals(attendantId))
      .length
  }
}