import { Module } from '@nestjs/common'

import { HttpChatsModule } from './chats/http-chats.module'
import { HttpContactsModule } from './contacts/http-contacts.module'
import { HttpInstancesModule } from './instances/http-instances.module'
import { HttpMessagesModule } from './messages/http-messages.module'

@Module({
	imports: [
		HttpInstancesModule,
		HttpContactsModule,
		HttpChatsModule,
		HttpMessagesModule,
	],
})
export class ChatHttpModule {}
