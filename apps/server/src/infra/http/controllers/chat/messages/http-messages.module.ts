import { Module } from '@nestjs/common'

import { FetchMessagesUseCase } from '@/domain/chat/application/use-cases/messages/fetch-messages-use-case.js'
import { FetchMessagesController } from './fetch-messages.controller.js'

@Module({
  controllers: [FetchMessagesController],
  providers: [FetchMessagesUseCase],
})
export class HttpMessagesModule {}
