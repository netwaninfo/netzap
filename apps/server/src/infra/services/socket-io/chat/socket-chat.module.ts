import { ChatEmitter } from '@/domain/chat/application/emitters/chat-emitter'
import { MessageEmitter } from '@/domain/chat/application/emitters/message-emitter'
import { Module } from '@nestjs/common'
import { UtilitiesModule } from '../../utilities/utilities.module'
import { SocketChatEmitter } from './emitters/socket-chat-emitter'
import { SocketMessageEmitter } from './emitters/socket-message-emitter'
import { SocketHandlersModule } from './handlers/socket-handlers.module'
import { SocketJoinRoomMiddleware } from './middlewares/socket-join-room.middleware'
import { SocketChatGateway } from './socket-chat.gateway'

@Module({
  imports: [UtilitiesModule, SocketHandlersModule],
  providers: [
    SocketChatGateway,
    SocketJoinRoomMiddleware,
    {
      provide: ChatEmitter,
      useClass: SocketChatEmitter,
    },
    {
      provide: MessageEmitter,
      useClass: SocketMessageEmitter,
    },
  ],
  exports: [ChatEmitter, MessageEmitter],
})
export class SocketChatModule {}
