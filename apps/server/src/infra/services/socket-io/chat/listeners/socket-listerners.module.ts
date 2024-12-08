import { Module } from '@nestjs/common'
import { SocketListenerTest } from './socket-listener-teste'

@Module({
  providers: [SocketListenerTest],
})
export class SocketListenersModule {}
