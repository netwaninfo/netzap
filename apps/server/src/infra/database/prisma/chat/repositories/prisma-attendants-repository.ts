import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UsersRepositories } from '@/domain/auth/application/repositories/users-repositories'
import {
	AttendantsRepository,
	AttendantsRepositoryFindUniqueByIdAndInstanceIdParams,
} from '@/domain/chat/application/repositories/attendants-repository'
import { Attendant } from '@/domain/chat/enterprise/entities/attendant'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { PrismaAttendantMapper } from '../mappers/prisma-attendant-mapper'

@Injectable()
export class PrismaAttendantsRepository implements AttendantsRepository {
	constructor(
		private prisma: PrismaService,
		private usersRepository: UsersRepositories,
	) {}

	async findUniqueByIdAndInstanceId({
		attendantId,
		instanceId,
	}: AttendantsRepositoryFindUniqueByIdAndInstanceIdParams): Promise<Attendant | null> {
		const raw = await this.prisma.attendant.findUnique({
			where: {
				ssoId: attendantId.toString(),
				instanceIds: {
					hasSome: [instanceId.toString()],
				},
			},
			select: {
				id: true,
				displayName: true,
				ssoId: true,
				instanceIds: false,
			},
		})

		if (!raw) return null

		const user = await this.usersRepository.findUniqueById({
			userId: UniqueEntityID.create(raw.ssoId),
		})

		if (!user) return null

		return PrismaAttendantMapper.toDomain({
			id: raw.id,
			ssoId: raw.ssoId,
			displayName: raw.displayName,
			instanceId: instanceId.toString(),
			email: user.email,
			name: user.name,
		})
	}
}
