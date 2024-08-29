import { Module } from '@nestjs/common'

import { ChatHttpModule } from './controllers/chat/chat-http.module'

@Module({
	imports: [ChatHttpModule],
})
export class HttpModule {}
