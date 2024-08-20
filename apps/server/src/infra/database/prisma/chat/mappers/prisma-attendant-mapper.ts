import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Attendant } from '@/domain/chat/enterprise/entities/attendant'
import { Attendant as PrismaAttendant } from '@prisma/client'
import { Except } from 'type-fest'

type Raw = Except<PrismaAttendant, 'instanceIds'> & {
	instanceId: string
	name: string
	email: string
}

export class PrismaAttendantMapper {
	static toDomain(raw: Raw): Attendant {
		return Attendant.create(
			{
				email: raw.email,
				instanceId: UniqueEntityID.create(raw.instanceId),
				name: raw.name,
			},
			UniqueEntityID.create(raw.ssoId),
		)
	}
}
