import { Module } from '@nestjs/common'

import { GetUserUseCase } from '@/domain/users/application/use-cases/users/get-user-use-case.js'
import { GetMeController } from './get-me.controller.js'

@Module({
  controllers: [GetMeController],
  providers: [GetUserUseCase],
})
export class HttpMeModule {}
