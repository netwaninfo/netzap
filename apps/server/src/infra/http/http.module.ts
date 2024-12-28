import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { HttpClerkAuthGuard } from '../auth/guards/http-clerk-auth.guard.js'
import { ChatHttpModule } from './controllers/chat/chat-http.module.js'
import { UsersHttpModule } from './controllers/users/users-http.module.js'

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
