import type {
  InstancesRepository,
  InstancesRepositoryFindUniqueByInstanceIdParams,
} from '@/domain/management/application/repositories/instances-repository'
import type { Instance } from '@/domain/management/enterprise/entities/instance'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { PrismaInstanceMapper } from '../mappers/prisma-instance-mapper'

@Injectable()
export class PrismaInstancesRepository implements InstancesRepository {
  constructor(private prisma: PrismaService) {}

  async findUniqueByInstanceId({
    instanceId,
  }: InstancesRepositoryFindUniqueByInstanceIdParams): Promise<Instance | null> {
    const raw = await this.prisma.instance.findUnique({
      where: {
        id: instanceId.toString(),
      },
    })

    if (!raw) return null

    return PrismaInstanceMapper.toDomain(raw)
  }

  async save(instance: Instance): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.instance.update({
        data: PrismaInstanceMapper.toPrisma(instance),
        where: {
          id: instance.id.toString(),
        },
      }),
    ])
  }
}
