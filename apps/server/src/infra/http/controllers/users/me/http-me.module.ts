import { Module } from '@nestjs/common'

import { GetUserUseCase } from '@/domain/users/application/use-cases/users/get-user-use-case'
import { GetMeController } from './get-me.controller'

@Module({
  controllers: [GetMeController],
  providers: [GetUserUseCase],
})
export class HttpMeModule {}
