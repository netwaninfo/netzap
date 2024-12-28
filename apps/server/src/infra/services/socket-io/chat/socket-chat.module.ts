import { Module } from '@nestjs/common'

import { ChatEmitter } from '@/domain/chat/application/emitters/chat-emitter.js'
import { MessageEmitter } from '@/domain/chat/application/emitters/message-emitter.js'
import { UtilitiesModule } from '../../utilities/utilities.module.js'
import { SocketChatEmitter } from './emitters/socket-chat-emitter.js'
import { SocketMessageEmitter } from './emitters/socket-message-emitter.js'
import { SocketHandlersModule } from './handlers/socket-handlers.module.js'
import { SocketAuthenticateUserMiddleware } from './middlewares/socket-authenticate-user.middleware.js'
import { SocketJoinRoomMiddleware } from './middlewares/socket-join-room.middleware.js'
import { SocketChatGateway } from './socket-chat.gateway.js'

@Module({
  imports: [UtilitiesModule, SocketHandlersModule],
  providers: [
    SocketChatGateway,
    SocketJoinRoomMiddleware,
    SocketAuthenticateUserMiddleware,

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
