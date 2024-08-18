import { Module } from '@nestjs/common'
import { PrismaManagementRepositories } from './management/prisma-management-repositories.module'
import { PrismaService } from './prisma.service'

@Module({
	providers: [PrismaService],
	imports: [PrismaManagementRepositories],
	exports: [PrismaService, PrismaManagementRepositories],
})
export class PrismaModule {}
