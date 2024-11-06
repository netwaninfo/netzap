import { Module } from '@nestjs/common'
import { HttpMeModule } from './me/http-me.module'

@Module({
  imports: [HttpMeModule],
})
export class UsersHttpModule {}
