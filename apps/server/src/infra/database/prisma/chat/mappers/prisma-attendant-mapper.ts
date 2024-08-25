import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Attendant } from '@/domain/chat/enterprise/entities/attendant'
import { Attendant as PrismaAttendant } from '@prisma/client'
import { type Except } from 'type-fest'

export type Raw = Except<PrismaAttendant, 'instanceIds'> & {
	name: string
	email: string
}

export class PrismaAttendantMapper {
	static toDomain(raw: Raw): Attendant {
		return Attendant.create(
			{
				email: raw.email,
				name: raw.name,
			},
			UniqueEntityID.create(raw.id),
		)
	}
}
