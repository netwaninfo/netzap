import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { InstancesRepository } from '@/domain/management/application/repositories/instances-repository'
import type { Instance } from '@/domain/management/enterprise/entities/instance'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { PrismaInstanceMapper } from '../mappers/prisma-instance-mapper'

@Injectable()
export class PrismaInstancesRepository implements InstancesRepository {
	constructor(private prisma: PrismaService) {}

	async findUniqueById(id: UniqueEntityID): Promise<Instance | null> {
		const raw = await this.prisma.instance.findUnique({
			where: {
				id: id.toString(),
			},
		})

		if (!raw) return null

		return PrismaInstanceMapper.toDomain(raw)
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
