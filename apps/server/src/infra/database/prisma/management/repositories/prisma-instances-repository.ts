import type {
	InstancesRepository,
	InstancesRepositoryCountByAttendantIdParams,
	InstancesRepositoryFindManyByAttendantIdParams,
	InstancesRepositoryFindUniqueByInstanceIdParams,
} from '@/domain/management/application/repositories/instances-repository'
import type { Instance } from '@/domain/management/enterprise/entities/instance'
import { Pagination } from '@/domain/shared/entities/pagination'
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

	async findManyByAttendantId({
		attendantId,
		page,
		take,
	}: InstancesRepositoryFindManyByAttendantIdParams): Promise<Instance[]> {
		const raw = await this.prisma.instance.findMany({
			where: {
				attendantIds: {
					hasSome: [attendantId.toString()],
				},
			},
			take,
			skip: Pagination.skip({ limit: take, page }),
		})

		return raw.map(PrismaInstanceMapper.toDomain)
	}

	async countByAttendantId({
		attendantId,
	}: InstancesRepositoryCountByAttendantIdParams): Promise<number> {
		const rows = await this.prisma.instance.count({
			where: {
				attendantIds: {
					hasSome: [attendantId.toString()],
				},
			},
		})

		return rows
	}

	async save(instance: Instance): Promise<void> {
		await this.prisma.$transaction([
			this.prisma.instance.update({
				data: PrismaInstanceMapper.toPrismaUpdate(instance),
				where: {
					id: instance.id.toString(),
				},
			}),
		])
	}
}
