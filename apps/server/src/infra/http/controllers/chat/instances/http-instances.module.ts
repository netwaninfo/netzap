import { FetchInstancesByAttendantUseCase } from '@/domain/chat/application/use-cases/instances/fetch-instances-by-attendant-use-case'
import { Module } from '@nestjs/common'
import { FetchInstancesByAttendantController } from './fetch-instances-by-attendant.controller'

@Module({
	controllers: [FetchInstancesByAttendantController],
	providers: [FetchInstancesByAttendantUseCase],
})
export class HttpInstancesModule {}
