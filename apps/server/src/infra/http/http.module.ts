import { Module } from '@nestjs/common'

import { APP_GUARD } from '@nestjs/core'
import { HttpClerkAuthGuard } from '../auth/guards/http-clerk-auth.guard'
import { ChatHttpModule } from './controllers/chat/chat-http.module'
import { UsersHttpModule } from './controllers/users/users-http.module'

@Module({
  imports: [ChatHttpModule, UsersHttpModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: HttpClerkAuthGuard,
    },
  ],
})
export class HttpModule {}
