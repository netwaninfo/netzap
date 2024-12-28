import { Global, Module } from '@nestjs/common'
import { SSOModule } from './sso/sso.module.js'

@Global()
@Module({
  imports: [SSOModule],
  exports: [SSOModule],
})
export class AuthModule {}
