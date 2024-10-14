import { Module } from '@nestjs/common'

import { SocketChatModule } from './chat/socket-chat.module'

@Module({
  imports: [SocketChatModule],
  exports: [SocketChatModule],
})
export class SocketModule {}
