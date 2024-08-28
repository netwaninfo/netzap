import { Global, Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ClerkAuthGuard } from './guards/clerk-auth.guard'
import { SSOModule } from './sso/sso.module'

@Global()
@Module({
	imports: [SSOModule],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ClerkAuthGuard,
		},
	],
})
export class AuthModule {}
