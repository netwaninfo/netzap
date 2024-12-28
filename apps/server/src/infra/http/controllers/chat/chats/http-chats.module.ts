import { Module } from '@nestjs/common'

import { CreateChatFromWAChatUseCase } from '@/domain/chat/application/use-cases/chats/create-chat-from-wa-chat-use-case.js'
import { CreateGroupChatFromWAChatUseCase } from '@/domain/chat/application/use-cases/chats/create-group-chat-from-wa-chat-use-case.js'
import { CreatePrivateChatFromWAChatUseCase } from '@/domain/chat/application/use-cases/chats/create-private-chat-from-wa-chat-use-case.js'
import { FetchChatsUseCase } from '@/domain/chat/application/use-cases/chats/fetch-chats-use-case.js'
import { GetChatUseCase } from '@/domain/chat/application/use-cases/chats/get-chat-use-case.js'
import { CreateContactFromWAContactUseCase } from '@/domain/chat/application/use-cases/contacts/create-contact-from-wa-contact-use-case.js'
import { CreateContactsFromWAContactsUseCase } from '@/domain/chat/application/use-cases/contacts/create-contacts-from-wa-contacts-use-case.js'
import { CreateGroupFromWAContactUseCase } from '@/domain/chat/application/use-cases/groups/create-group-from-wa-contact-use-case.js'
import { ServicesModule } from '@/infra/services/services.module.js'
import { FetchChatsController } from './fetch-chats.controller.js'
import { GetChatController } from './get-chat.controller.js'

@Module({
  imports: [ServicesModule],
  controllers: [FetchChatsController, GetChatController],
  providers: [
    FetchChatsUseCase,

    GetChatUseCase,
    CreateChatFromWAChatUseCase,
    CreatePrivateChatFromWAChatUseCase,
    CreateContactFromWAContactUseCase,
    CreateGroupChatFromWAChatUseCase,
    CreateGroupFromWAContactUseCase,
    CreateContactsFromWAContactsUseCase,
  ],
})
export class HttpChatsModule {}
