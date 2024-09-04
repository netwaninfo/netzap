import { Module } from '@nestjs/common'

import { APP_GUARD } from '@nestjs/core'
import { HttpClerkAuthGuard } from '../auth/guards/http-clerk-auth.guard'
import { ChatHttpModule } from './controllers/chat/chat-http.module'

@Module({
	imports: [ChatHttpModule],
	providers: [
		{
			provide: APP_GUARD,
			useClass: HttpClerkAuthGuard,
		},
	],
})
export class HttpModule {}
