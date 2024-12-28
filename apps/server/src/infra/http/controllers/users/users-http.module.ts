import { Module } from '@nestjs/common'

import { HttpMeModule } from './me/http-me.module.js'

@Module({
  imports: [HttpMeModule],
})
export class UsersHttpModule {}
