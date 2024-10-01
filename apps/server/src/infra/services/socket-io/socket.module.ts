import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'

import { SocketChatModule } from './chat/socket-chat.module'
import { SocketExceptionsFilter } from './socket-exception-filter'

@Module({
  imports: [SocketChatModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: SocketExceptionsFilter,
    },
  ],
  exports: [SocketChatModule],
})
export class SocketModule {}
