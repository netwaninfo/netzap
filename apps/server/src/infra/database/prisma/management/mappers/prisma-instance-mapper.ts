import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Instance } from '@/domain/management/enterprise/entities/instance'
import type { Prisma, Instance as RawInstance } from '@prisma/client'

export class PrismaInstanceMapper {
	static toDomain(raw: RawInstance): Instance {
		return Instance.create(
			{
				name: raw.name,
				phone: raw.phone,
				qrCode: raw.qrCode,
				status: raw.status,
			},
			UniqueEntityID.create(raw.id),
		)
	}

	static toPrismaUpdate(
		instance: Instance,
	): Prisma.InstanceUncheckedUpdateInput {
		return {
			name: instance.name,
			phone: instance.phone,
			qrCode: instance.qrCode,
			status: instance.status,
		}
	}
}
