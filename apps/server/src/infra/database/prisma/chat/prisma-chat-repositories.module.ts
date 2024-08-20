import { AttendantsRepository } from '@/domain/chat/application/repositories/attendants-repository'
import { ContactsRepository } from '@/domain/chat/application/repositories/contacts-repository'
import { GroupsRepository } from '@/domain/chat/application/repositories/groups-repository'
import { Module } from '@nestjs/common'
import { PrismaAttendantsRepository } from './repositories/prisma-attendants-repository'
import { PrismaContactsRepository } from './repositories/prisma-contacts-repository'
import { PrismaGroupsRepository } from './repositories/prisma-groups-repository'

@Module({
	providers: [
		{
			provide: ContactsRepository,
			useClass: PrismaContactsRepository,
		},
		{
			provide: GroupsRepository,
			useClass: PrismaGroupsRepository,
		},
		{
			provide: AttendantsRepository,
			useClass: PrismaAttendantsRepository,
		},
	],
	exports: [ContactsRepository, GroupsRepository, AttendantsRepository],
})
export class PrismaChatRepositories {}
