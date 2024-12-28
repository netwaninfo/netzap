import { Module } from '@nestjs/common'

import { HttpChatsModule } from './chats/http-chats.module.js'
import { HttpContactsModule } from './contacts/http-contacts.module.js'
import { HttpInstancesModule } from './instances/http-instances.module.js'
import { HttpMessagesModule } from './messages/http-messages.module.js'

@Module({
  imports: [
    HttpInstancesModule,
    HttpContactsModule,
    HttpChatsModule,
    HttpMessagesModule,
  ],
})
export class ChatHttpModule {}
