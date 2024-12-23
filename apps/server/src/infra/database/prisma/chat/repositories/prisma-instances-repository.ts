import {
  InstancesRepository,
  InstancesRepositoryCountByAttendantIdParams,
  InstancesRepositoryFindManyByAttendantIdParams,
} from '@/domain/chat/application/repositories/instances-repository'
import { Instance } from '@/domain/chat/enterprise/entities/instance'
import { Pagination } from '@/domain/shared/entities/pagination'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { PrismaInstanceMapper } from '../mappers/prisma-instance-mapper'

@Injectable()
export class PrismaInstancesRepository implements InstancesRepository {
  constructor(private prisma: PrismaService) {}

  async findManyByAttendantId({
    attendantId,
    page,
    take,
    status,
  }: InstancesRepositoryFindManyByAttendantIdParams): Promise<Instance[]> {
    const raw = await this.prisma.instance.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        status: true,
        state: true,
        attendantIds: true,
      },
      where: {
        ...(status && { status }),
        attendantIds: {
          hasSome: [attendantId.toString()],
        },
      },
      take,
      skip: Pagination.skip({ limit: take, page }),
    })

    for (const item of raw) {
      item.attendantIds = [attendantId.toString()]
    }

    return raw.map(PrismaInstanceMapper.toDomain)
  }

  async countByAttendantId({
    attendantId,
    status,
  }: InstancesRepositoryCountByAttendantIdParams): Promise<number> {
    const rows = await this.prisma.instance.count({
      where: {
        ...(status && { status }),
        attendantIds: {
          hasSome: [attendantId.toString()],
        },
      },
    })

    return rows
  }
}
