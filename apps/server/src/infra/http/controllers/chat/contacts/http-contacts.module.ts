import { FetchContactsUseCase } from '@/domain/chat/application/use-cases/contacts/fetch-contacts-use-case'
import { Module } from '@nestjs/common'
import { FetchContactsByInstanceController } from './fetch-contacts-by-instance.controller'

@Module({
	controllers: [FetchContactsByInstanceController],
	providers: [FetchContactsUseCase],
})
export class HttpContactsModule {}
