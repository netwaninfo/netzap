import { FetchInstancesUseCase } from '@/domain/chat/application/use-cases/instances/fetch-instances-use-case'
import { Module } from '@nestjs/common'
import { FetchInstancesController } from './fetch-instances.controller'

@Module({
  controllers: [FetchInstancesController],
  providers: [FetchInstancesUseCase],
})
export class HttpInstancesModule {}
