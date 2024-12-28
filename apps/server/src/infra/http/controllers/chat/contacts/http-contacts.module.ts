import { Module } from '@nestjs/common'

import { FetchContactsUseCase } from '@/domain/chat/application/use-cases/contacts/fetch-contacts-use-case.js'
import { FetchContactsController } from './fetch-contacts.controller.js'

@Module({
  controllers: [FetchContactsController],
  providers: [FetchContactsUseCase],
})
export class HttpContactsModule {}
