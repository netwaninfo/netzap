import {
  AttendantsRepository,
  AttendantsRepositoryFindUniqueByAttendantIdAndInstanceIdParams,
} from '@/domain/chat/application/repositories/attendants-repository'
import { Attendant } from '@/domain/chat/enterprise/entities/attendant'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { PrismaAttendantMapper } from '../mappers/prisma-attendant-mapper'

@Injectable()
export class PrismaAttendantsRepository implements AttendantsRepository {
  constructor(private prisma: PrismaService) {}

  async findUniqueByAttendantIdAndInstanceId({
    attendantId,
    instanceId,
  }: AttendantsRepositoryFindUniqueByAttendantIdAndInstanceIdParams): Promise<Attendant | null> {
    const raw = await this.prisma.attendant.findUnique({
      where: {
        id: attendantId.toString(),
        instanceIds: {
          hasSome: [instanceId.toString()],
        },
      },
    })

    if (!raw) return null

    return PrismaAttendantMapper.toDomain(raw)
  }
}