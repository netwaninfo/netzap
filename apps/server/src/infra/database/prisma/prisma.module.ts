import { Module } from '@nestjs/common'
import { ChatPrismaRepositories } from './chat/chat-prisma-repositories.module'
import { ManagementPrismaRepositories } from './management/management-prisma-repositories.module'
import { PrismaService } from './prisma.service'

@Module({
	providers: [PrismaService],
	imports: [ManagementPrismaRepositories, ChatPrismaRepositories],
	exports: [
		PrismaService,
		ManagementPrismaRepositories,
		ChatPrismaRepositories,
	],
})
export class PrismaModule {}
