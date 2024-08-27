import { ContactsRepository } from '@/domain/chat/application/repositories/contacts-repository'
import { GroupsRepository } from '@/domain/chat/application/repositories/groups-repository'
import { Module } from '@nestjs/common'
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
	],
	exports: [ContactsRepository, GroupsRepository],
})
export class PrismaChatRepositories {}
