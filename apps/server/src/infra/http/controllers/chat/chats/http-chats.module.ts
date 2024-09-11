import { FetchChatsUseCase } from '@/domain/chat/application/use-cases/chats/fetch-chats-use-case'
import { Module } from '@nestjs/common'
import { FetchChatsController } from './fetch-chats.controller'

@Module({
  controllers: [FetchChatsController],
  providers: [FetchChatsUseCase],
})
export class HttpChatsModule {}
