import { Module } from '@nestjs/common'

import { HttpChatsModule } from './chats/http-chats.module'
import { HttpContactsModule } from './contacts/http-contacts.module'
import { HttpInstancesModule } from './instances/http-instances.module'

@Module({
	imports: [HttpInstancesModule, HttpContactsModule, HttpChatsModule],
})
export class ChatHttpModule {}
