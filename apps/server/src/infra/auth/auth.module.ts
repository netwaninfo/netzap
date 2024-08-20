import { Global, Module } from '@nestjs/common'
import { SSOModule } from './sso/sso.module'

@Global()
@Module({
	imports: [SSOModule],
})
export class AuthModule {}
