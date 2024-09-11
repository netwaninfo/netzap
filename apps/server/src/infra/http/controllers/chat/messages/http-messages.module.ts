import { FetchMessagesUseCase } from '@/domain/chat/application/use-cases/messages/fetch-messages-use-case'
import { Module } from '@nestjs/common'
import { FetchMessagesController } from './fetch-messages.controller'

@Module({
  controllers: [FetchMessagesController],
  providers: [FetchMessagesUseCase],
})
export class HttpMessagesModule {}
