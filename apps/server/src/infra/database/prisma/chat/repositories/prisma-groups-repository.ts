import { Injectable } from '@nestjs/common'

import type {
  GroupsRepository,
  GroupsRepositoryFindUniqueByWAGroupIdAndInstanceIdParams,
} from '@/domain/chat/application/repositories/groups-repository.js'
import { Group } from '@/domain/chat/enterprise/entities/group.js'
import { PrismaService } from '../../prisma.service.js'
import { PrismaGroupMapper } from '../mappers/prisma-group-mapper.js'

@Injectable()
export class PrismaGroupsRepository implements GroupsRepository {
  constructor(private prisma: PrismaService) {}

  async findUniqueByWAGroupIdAndInstanceId({
    instanceId,
    waGroupId,
  }: GroupsRepositoryFindUniqueByWAGroupIdAndInstanceIdParams): Promise<Group | null> {
    const raw = await this.prisma.group.findUnique({
      where: {
        waGroupId_instanceId: {
          waGroupId: waGroupId.toString(),
          instanceId: instanceId.toString(),
        },
      },
    })

    if (!raw) return null

    return PrismaGroupMapper.toDomain(raw)
  }

  async create(group: Group): Promise<void> {
    try {
      await this.prisma.$transaction([
        this.prisma.group.create({
          data: PrismaGroupMapper.toPrismaCreate(group),
        }),
      ])
    } catch (error) {}
  }
}
